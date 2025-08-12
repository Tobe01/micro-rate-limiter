# micro-rate-limiter

A lightweight, dependency-free in-memory rate limiter for Node.js.

Ideal for small to medium projects where you need to control request frequency without pulling in heavy external packages or databases.

---

## Features
- **In-memory** rate limiting (no database required)
- Works with **Express.js**
- Easy to integrate and customize
- Example project with browser test client

---


### Related Article
You can read the full tutorial here:

- [Building a Lightweight API Rate Limiter in Node.js Without External Libraries](https://tobechiduru.hashnode.dev/building-a-lightweight-api-rate-limiter-in-nodejs-without-external-libraries)


---

## Installation
```bash
Clone this repository:

git clone https://github.com/tobe01/micro-rate-limiter.git
cd micro-rate-limiter
npm install


---

```
## Basic Setup
```bash

// server.js
const express = require('express');
const rateLimiter = require('../src/rateLimiter');

const app = express();

// Limit: 10 requests per 60 seconds per IP
app.use(rateLimiter({ windowMs: 60 * 1000, max: 10 }));

app.get('/', (req, res) => {
  res.json({ message: 'Hello, you are within the rate limit.' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

---
```

Testing in Browser
An HTML + CSS test client is included in the /example folder.

Start the server:
```bash
node example/server.js
Open example/test-limiter.html in your browser.

---
```

Click Start Test to fire multiple requests and see the limiter in action, including a live countdown until reset.

## Folder Structure:
```bash
micro-rate-limiter/
│
├── src/
│   └── rateLimiter.js   # Core rate limiter logic
│
├── example/
│   ├── server.js        # Express server example
│   ├── test-limiter.html # Browser test page
│   └── styles.css       # CSS for test page
│
├── package.json
└── README.md

---
```

## Customization
The rateLimiter function accepts an options object:

Option	Type	Default	Description
windowMs	Number	60000	Time window in milliseconds
max	Number	10	Max requests per IP within the window

Example:
```bash
javascript rateLimiter({ windowMs: 30000, max: 5 }) // 5 requests every 30 seconds

---
```
License
Free to use, modify, and share.

Made with ❤️ in Node.js
