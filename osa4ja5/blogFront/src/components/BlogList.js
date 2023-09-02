import { React, useState } from 'react'
import Blog from './Blog'

const BlogsList = ({ blogs, user, blogService, setBlogs }) => {
  // Käytetään objektia, jossa blogien id:t toimivat avaimina ja näkyvyyden tila arvoina
  const [blogVisibility, setBlogVisibility] = useState({})

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

    try {
      await blogService.update(blog.id, uusiBlog)
    } catch {
      console.log('pieleen meni')
    }

    // Päivitä lista
    const lisätty = await blogService.getAll()
    setBlogs(lisätty)
  }

  const handleDelete = async (blog) => {
    if (user.username === blog.user.username) {
      try {
        await blogService.deleteBlog(blog.id)
      } catch {
        console.log('virhe poistaessa')
      }
    } else {
      console.log('poisto ei sallittu')
    }
    // Päivitä lista
    const lisätty = await blogService.getAll()
    setBlogs(lisätty)
  }

  return (
    <div>
      <h2>Blogit !</h2>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog => (
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