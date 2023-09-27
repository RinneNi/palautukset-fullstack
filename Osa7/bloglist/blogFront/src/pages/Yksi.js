import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import '../index.css'
import { kommenttiThunk, removeBlog, likeBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'


export const Yksi = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === id)
  const loggedUser = useSelector(state => state.user)

  if (!blog) {
    return null
  }

  const handleDelete = async (blog) => {
    dispatch(removeBlog(blog))
    navigate('/')
  }

  const handleCommentChange = async (event) => {
    event.preventDefault()
    setComment(event.target.value)
  }

  const kommentoi = async (event) => {
    event.preventDefault()
    const json = JSON.parse(`{ "comment": "${comment}" }`)
    if (comment.length > 0) {
      const juu = await blogService.addComment(blog.id, json)
      dispatch(kommenttiThunk(juu))
    }
    setComment('')
  }

  const handleLike = async (blog) => {
    const uusiBlog = {
      likes: blog.likes + 1,
    }
    dispatch(likeBlog(blog.id, uusiBlog))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      Author: {blog.author}<br/>
      Url:
      <a
        href={`https://${blog.url}`}
        target="_blank"
        rel="noopener noreferrer external"
      >
        {blog.url}<br/>
      </a>
      Likes: {blog.likes}
      <button onClick={() => handleLike(blog)}>Like</button>
      <br/>
      {blog.user.username === loggedUser.username && (
        <button className="poista" onClick={() => handleDelete(blog)}>
          Poista
        </button>
      )}
      <br/><br />
      <div>
        <h3>Kommentit:</h3>
        {blog.comments.length === 0 ? (
          <p>Ei kommentteja vielä :(</p>
        ) : (
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        )}
      </div>
      <input
        type="text"
        placeholder="Lisää kommentti"
        value={comment}
        onChange={handleCommentChange}
      />
      <button onClick={kommentoi}>Lisää</button>
    </div>
  )
}