const User = require('../models/user')
const jwt = require('jsonwebtoken')

const userExtractor = async (req, res, next) => {
  try {
    const authorization = req.get('authorization')

    if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
      return res.status(401).json({ error: 'Token missing or invalid' })
    }

    const token = authorization.substring(7)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    req.token = token
    req.user = await User.findById(decodedToken.id)
  } catch (error) {
    next(error)
  }

  next()
}

module.exports = userExtractor
