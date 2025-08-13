export default class MemoryStore {
  constructor() {
    this.hits = new Map()
  }

  incr(key, windowMs) {
    const now = Date.now()
    const entry = this.hits.get(key)

    if (!entry || now >= entry.reset) {
      const newEntry = { count: 1, reset: now + windowMs }
      this.hits.set(key, newEntry)
      return { total: 1, reset: newEntry.reset }
    }

    entry.count += 1
    return { total: entry.count, reset: entry.reset }
  }

  cleanup(olderThanMs = 24 * 60 * 60 * 1000) {
    const threshold = Date.now() - olderThanMs
    for (const [k, v] of this.hits.entries()) {
      if (v.reset < threshold) this.hits.delete(k)
    }
  }
}