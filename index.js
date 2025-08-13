import MemoryStore from './memoryStore.js'

export class RateLimiter {
  constructor(options = {}) {
    const { windowMs = 60_000, max = 10, keyGenerator = null, store = null } = options
    this.windowMs = windowMs
    this.max = max
    this.keyGenerator = keyGenerator || ((req) => req.ip || req.headers['x-forwarded-for'] || 'unknown')
    this.store = store || new MemoryStore()
  }

  async consumeKey(key) {
    const { total, reset } = this.store.incr(key, this.windowMs)
    const remaining = Math.max(this.max - total, 0)
    const limited = total > this.max
    return { total, remaining, reset, limited }
  }

  async consume(req) {
    const key = typeof this.keyGenerator === 'function' ? this.keyGenerator(req) : req.ip
    return this.consumeKey(key)
  }
}

export function createExpressMiddleware(limiter, opts = {}) {
  const { onLimit = null } = opts
  return async function rateLimitMiddleware(req, res, next) {
    try {
      const { total, remaining, reset, limited } = await limiter.consume(req)

      console.log(`IP: ${req.ip} | Total: ${total} | Remaining: ${remaining} | Reset: ${new Date(reset).toISOString()} | Limited: ${limited}`)

      res.setHeader('X-RateLimit-Limit', String(limiter.max))
      res.setHeader('X-RateLimit-Remaining', String(remaining))
      res.setHeader('X-RateLimit-Reset', String(Math.ceil(reset / 1000)))

      if (limited) {
        res.setHeader('Retry-After', String(Math.ceil((reset - Date.now()) / 1000)))
        if (typeof onLimit === 'function') return onLimit(req, res)
        return res.status(429).send('Too many requests')
      }

      next()
    } catch (err) {
      next(err)
    }
  }
}