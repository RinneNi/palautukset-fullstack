import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogList from './BlogList'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('Title ja nappi näkyy, URL ja liket ei', () => {
  const blog = {
    id: 1,
    title: 'Testi Blogi',
    author: 'Testaaja',
    url: 'www.hienoblogi.fi',
    likes: 5,
    user: { name: 'Testaaja', username: 'tester123' },
  }

  // Renderöidään Blog komponentti
  render(
    <Blog
      blog={blog}
      user={{ username: 'tester123' }}
      blogVisibility={{ [blog.id]: false }}
    />,
  )

  // Title näkyvissä
  const titleElement = screen.getByText('Testi Blogi')
  expect(titleElement).toBeInTheDocument()

  // Likes ei näkyvissä
  const likesElement = screen.queryByText('Likes:')
  expect(likesElement).not.toBeInTheDocument()

  // URL ei näkyvissä
  const urlElement = screen.queryByText('www.hienoblogi.fi')
  expect(urlElement).not.toBeInTheDocument()

  // Nappi näkyvissä
  const nappi = screen.getByText('view')
  expect(nappi).toBeInTheDocument()
})

test('URL ja liket näkyy kun painetaan nappia', async () => {
  const blogs = [
    {
      id: 1,
      title: 'Testi Blogi',
      author: 'Testaaja',
      url: 'www.hienoblogi.fi',
      likes: 5,
      user: { name: 'Testaaja', username: 'tester123' },
    },
  ]

  // Renderöidään BlogsList
  render(<BlogList blogs={blogs} user={{ username: 'tester123' }} />)

  const user = userEvent.setup()

  // Liket ja url ei näkyvissä
  const likesElement = screen.queryByText('Likes:')
  expect(likesElement).not.toBeInTheDocument()
  const urlElement = screen.queryByText('www.hienoblogi.fi')
  expect(urlElement).not.toBeInTheDocument()

  // etsitään ja painetaan show
  const nappi = screen.getByText('view')
  await user.click(nappi)

  // Liket ja URL näkyvissä
  expect(screen.getByText('www.hienoblogi.fi')).toBeInTheDocument()
  expect(screen.getByText(/Likes:/)).toBeInTheDocument()
})

test('Liket menee oikein', async () => {
  const blog = {
    id: 1,
    title: 'Testi Blogi',
    author: 'Testaaja',
    url: 'www.hienoblogi.fi',
    likes: 5,
    user: { name: 'Testaaja', username: 'tester123' },
  }

  const handleLikeMock = jest.fn()
  // Renderöidään Blog komponentti
  render(
    <Blog
      blog={blog}
      user={{ username: 'tester123' }}
      blogVisibility={{ [blog.id]: true }}
      handleLike={handleLikeMock}
    />,
  )

  const user = userEvent.setup()
  const like = screen.getByText('Like')
  await user.click(like)
  await user.click(like)

  expect(handleLikeMock).toHaveBeenCalledTimes(2)
})

test('Blogin luova komponentti kutsuu callback funktioita oikein', async () => {
  const blogFormRef = React.createRef()
  const setSuccessMessage = jest.fn()
  const setErrorMessage = jest.fn()
  const setBlogs = jest.fn()
  const mockCreate = jest.fn()
  const mockGetAll = jest.fn()
  const blogService = { create: mockCreate, getAll: mockGetAll }

  render(
    <BlogForm
      blogFormRef={blogFormRef}
      setSuccessMessage={setSuccessMessage}
      setErrorMessage={setErrorMessage}
      setBlogs={setBlogs}
      blogService={blogService}
    />,
  )

  const session = userEvent.setup()

  const titleInput = screen.getByText('Title:')
  const authorInput = screen.getByText('Author:')
  const urlInput = screen.getByText('Url:')
  const addButton = screen.getByText('Lisää')

  await session.type(titleInput, 'Test Title')
  await session.type(authorInput, 'Test Author')
  await session.type(urlInput, 'www.testurl.fi')
  await session.click(addButton)

  await expect(mockCreate).toHaveBeenCalledWith({
    title: 'Test Title',
    author: 'Test Author',
    url: 'www.testurl.fi',
  })
})
