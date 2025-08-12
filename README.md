# micro-rate-limiter

Minimal rate limiter for Node.js. Exports a small RateLimiter class and an Express middleware factory.

Usage (Express):

```js
import express from 'express'
import { createExpressMiddleware, RateLimiter } from './src/index.js'

const app = express()
const limiter = new RateLimiter({ windowMs: 60_000, max: 10 })
app.use(createExpressMiddleware(limiter))

app.get('/', (req, res) => res.send('hello'))
app.listen(3000)
```

Usage (plain Node): call limiter.consume(key) to get the current count and reset time.

---
