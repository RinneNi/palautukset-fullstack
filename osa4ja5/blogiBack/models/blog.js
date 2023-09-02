const mongoose = require('mongoose')
const config = require('../utils/config')

mongoose.set('strictQuery', false)
//mongoose.set('strictPopulate', false)

const url = config.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
.then(result => {
  if (result) {
    console.log('connected to MongoDB')
  }
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)