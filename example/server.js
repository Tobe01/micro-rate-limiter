import express from 'express'
import { RateLimiter, createExpressMiddleware } from '../src/index.js'

const app = express()
const limiter = new RateLimiter({ windowMs: 60_000, max: 10 })
app.use(createExpressMiddleware(limiter))

app.get('/', (req, res) => res.send('Hello, you are within the rate limit!'))

app.listen(3000, () => console.log('Listening on http://localhost:3000'))
