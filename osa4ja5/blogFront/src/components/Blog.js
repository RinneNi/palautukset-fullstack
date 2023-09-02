import React from 'react'

const Blog = ({ blog, toggleVisibility, handleLike, handleDelete, user, blogVisibility }) => {
  return (
    <div className='blog' key={blog.id} style={{ border: '3px solid black', padding: '10px', marginBottom: '10px' }}>
      {blog.title}
      {blogVisibility[blog.id] ? (
        <button onClick={() => toggleVisibility(blog.id)}>hide</button>
      ) : (
        <button onClick={() => toggleVisibility(blog.id)}>view</button>
      )}
      {blogVisibility[blog.id] && (
        <div>
          <br />
          Author: {blog.author}
          <br />
          <a href={`https://${blog.url}`} target="_blank" rel="noopener noreferrer external">
            {blog.url}
          </a>
          <br />
          Likes: {blog.likes}
          <button onClick={() => handleLike(blog)}>Like</button>
          <br />
          {blog.user.name}
          <br />
          {blog.user.username === user.username && (
            <button className='poista' onClick={() => handleDelete(blog)}>
              Poista
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog