const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const tb1 = {
    title: "testing is easy",
    author: "niilo",
    url: "www.helppotesti.fi",
    likes: 22
  }
const tb2 = {
    title: "ei ollukkaa virhe",
    author: "tom",
    url: "www.einiinhelppotesti.fi",
    likes: 69
  }
const testUser = {
  username: 'tester',
  name: 'Test User',
  password: 'salasana',
}
const login = {
  username: testUser.username,
  password: testUser.password
}


beforeAll(async () => {
  await User.deleteMany({ username: 'tester' })
  await api
    .post('/api/users')
    .send(testUser)
})


beforeEach(async () => {
  const loginResponse = await api.post('/api/login').send(login)
  const testToken = loginResponse.body.token

  await Blog.deleteMany({})
  await api
    .post('/api/blogs')
    .set('Authorization','Bearer ' + testToken)
    .send(tb1)

    await api
    .post('/api/blogs')
    .set('Authorization','Bearer ' + testToken)
    .send(tb2)
})


async function kirjaudu() {
  const loginResponse = await api.post('/api/login').send(login)
  const testToken = loginResponse.body.token
  return { testToken }
}

test('blogs are returned as json and right ammount', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(2)
})

test('returned blogs have id field', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})


test('Blogin lisäys ilman tokenia epäonnistuu', async () => {
  const newBlog = {
    "title": "Onnistuuko lisäys",
    "author": "tester",
    "url": "www.lisäystesti.fi",
    "likes": 112
}
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})


test('a valid blog can be added ', async () => {
  const { testToken } = await kirjaudu()
  const newBlog = {
      "title": "Onnistuuko lisäys",
      "author": "tester",
      "url": "www.lisäystesti.fi",
      "likes": 112
  }

  await api
    .post('/api/blogs')
    .set('Authorization','Bearer ' + testToken)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(3)
  expect(contents).toContain('Onnistuuko lisäys')
})


test('blog added with no defined likes gets 0 as default', async () => {
  const { testToken } = await kirjaudu()
  const newBlog = {
    "title": "minulla ei ole tykkäyksiä",
    "author": "Mike",
    "url": "www.zerolikes.com"
  }
  await api
    .post('/api/blogs')
    .set('Authorization','Bearer ' + testToken)
    .send(newBlog)
    .expect(201)
    
  const response = await api.get('/api/blogs')

  const addedBlog = response.body.find(blog => blog.title === newBlog.title)
  const likes = addedBlog?.likes
  
  expect(likes).toBe(0)
})

test('blog with no title attribute returns 400 bad request', async () => {
  const { testToken } = await kirjaudu()
  const newBlog = {
    "author": "en osaa kirjoittaa blogia"
  }

  await api
    .post('/api/blogs')
    .set('Authorization','Bearer ' + testToken)
    .send(newBlog)
    .expect(400)
})

test('deleting blogs works and returns 204', async () => {
  const { testToken } = await kirjaudu()
  const response = await api
    .get('/api/blogs')
    .expect(200)

  const blogIdToDelete = response.body[0].id
  await api
    .delete(`/api/blogs/${blogIdToDelete}`)
    .set('Authorization','Bearer ' + testToken)
    .expect(204)

  const newResponse = await api
    .get('/api/blogs')
    .expect(200)

  expect(newResponse.body.length).toBe(response.body.length - 1)
})

test('modifying blogs with HTTP PUT work as expected', async () => {
  const { testToken } = await kirjaudu()
  const newBlog = {
    "title": "minulla ei ole tykkäyksiä (vielä)",
    "author": "Mike",
    "url": "www.zerolikes.com"
  }

  await api
  .post('/api/blogs')
  .set('Authorization','Bearer ' + testToken)
  .send(newBlog)
  .expect(201)

  const response = await api.get('/api/blogs')

  const addedBlog = response.body.find(blog => blog.title === newBlog.title)
  const likes = addedBlog?.likes
  expect(likes).toBe(0)

  const newNewBlog = {
    ...newBlog,
    "likes": addedBlog.likes + 1
  }

  const uusiUrl = `/api/blogs/${addedBlog.id}`

  await api
  .put(uusiUrl)
  .send(newNewBlog)
  .expect(200)

  const responseTwo = await api.get('/api/blogs')

  const addedNewBlog = responseTwo.body.find(blog => blog.title === newBlog.title)
  const newLikes = addedNewBlog?.likes
  expect(newLikes).toBe(1)
})


afterAll(async () => {
  await mongoose.connection.close()
})