const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('./userExtractor')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  res.json(blogs)
})

blogRouter.post('/', userExtractor, async (req, res) => {
  if (!req.token) {
    return res.status(401).json({ error: 'Token missing or invalid' })
  }

  const body = req.body
  const user = req.user

  try {
    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user.id,
    })

    try {
      const savedBlog = await newBlog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      await savedBlog.populate('user', { username: 1, name: 1 })
      res.status(201).json({ message: 'lisätty', blog: savedBlog })
    } catch (error) {
      console.error(error)
      res
        .status(400)
        .json({
          error: 'Virhe, tarkista lähetyksen muoto tai voi olla muutakin',
        })
    }
  } catch {
    res.status(400).json({ error: 'Invalid token.' })
  }
})

blogRouter.post('/:id/comments', async (req, res) => {
  const id = req.params.id
  const comment = req.body.comment
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $push: { comments: comment } },
      { new: true }
    )
    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    res.status(201).json(updatedBlog)
  } catch (error) {
    res.status(500).json({ error: 'pieleen meni' })
  }
})


blogRouter.delete('/:id', userExtractor, async (req, res, next) => {
  try {
    // user saadaan middlewaesta userExtractor
    const user = req.user
    // Haetaan poistettava blogi
    const poistettava = await Blog.findById(req.params.id)
    // Tarkistetaan onko poiston pyytäjä blogin kirjoittaja
    if (user._id.toString() === poistettava.user.toString()) {
      // Poistetaan blogi
      const result = await Blog.findByIdAndRemove(req.params.id)
      const info = `${result.title} poistettu.`
      console.log(info)
      res.status(204).json({ message: info })
    }
  } catch (error) {
    next(error)
  }
})

// findUpdatelle annetaan NORMAALI javascript olio
blogRouter.put('/:id', async (req, res, next) => {
  const blog = req.body

  try {
    const result = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
      runValidators: true,
      context: 'query',
    })
    res.json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter
