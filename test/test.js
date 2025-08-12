import assert from 'assert'
import { RateLimiter } from '../src/index.js'

async function run() {
  const limiter = new RateLimiter({ windowMs: 1000, max: 2, keyGenerator: () => 'test' })
  const a = await limiter.consumeKey('test')
  assert.strictEqual(a.total, 1)
  const b = await limiter.consumeKey('test')
  assert.strictEqual(b.total, 2)
  const c = await limiter.consumeKey('test')
  assert.strictEqual(c.total, 3)
  assert.strictEqual(c.limited, true)
  console.log('tests passed')
}

run().catch(err => { console.error(err); process.exit(1) })
