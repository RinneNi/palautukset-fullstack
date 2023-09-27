const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

// Mahdollisuus lisätä käyttäjä
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (password.length < 3) {
    response
      .status(400)
      .json({ error: 'salasanan tulee olla vähintään 3 merkkiä' })
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    try {
      const savedUser = await user.save()
      response.status(201).json(savedUser)
    } catch {
      response
        .status(400)
        .json({ error: 'Virhe, username tulee olla uniikki ja väh 3 merkkiä' })
    }
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    url: 1,
    likes: 1,
  })
  response.json(users)
})

module.exports = usersRouter
