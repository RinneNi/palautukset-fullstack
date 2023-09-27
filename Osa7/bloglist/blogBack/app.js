const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/routes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const tokenExtractor = require('./controllers/tokenExtractor')

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testRouter')
  app.use('/api/testing', testingRouter)
}

module.exports = app
