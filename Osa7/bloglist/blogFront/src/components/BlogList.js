import { useDispatch, useSelector } from 'react-redux'

import React, { useState } from 'react'
import Blog from './Blog'

import { removeBlog, likeBlog } from '../reducers/blogReducer'

const BlogsList = () => {
  const dispatch = useDispatch()
  // Käytetään objektia, jossa blogien id:t toimivat avaimina ja näkyvyyden tila arvoina
  const [blogVisibility, setBlogVisibility] = useState({})

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  if (!blogs) {
    return null
  }

  const toggleVisibility = (blogId) => {
    // Kopio nykyisestä tilasta, jotta sitä voidaan muokata turvallisesti
    const updatedVisibility = { ...blogVisibility }
    // Vaihdetaan näkyvyyden tila: jos avain on olemassa, vaihdetaan arvoa (toggle)
    updatedVisibility[blogId] = !updatedVisibility[blogId]
    // Päivitetään tila uudella näkyvyyden tilalla
    setBlogVisibility(updatedVisibility)
  }

  const handleLike = async (blog) => {
    const uusiBlog = {
      likes: blog.likes + 1,
    }
    dispatch(likeBlog(blog.id, uusiBlog))
  }

  const handleDelete = async (blog) => {
    dispatch(removeBlog(blog))
  }

  const apuRenderointiin = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>Blogit !</h2>
      {apuRenderointiin
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            toggleVisibility={toggleVisibility}
            handleLike={handleLike}
            handleDelete={handleDelete}
            user={user}
            blogVisibility={blogVisibility}
          />
        ))}
    </div>
  )
}

export default BlogsList
