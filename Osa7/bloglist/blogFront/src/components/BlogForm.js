// Blogin luominen'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'

const BlogForm = ({
  blogFormRef,
}) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    const newObject = {
      title: title,
      author: author,
      url: url,
    }
    try {
      dispatch(addBlog(newObject))

      blogFormRef.current.toggleVisibility()
      dispatch(setNotification({
        message: `Blogi ${newObject.title} Kirjoittaja ${newObject.author} lisätty!`,
        type: 'success' }, 5))
    } catch (error) {
      dispatch(setNotification({
        message: 'Epäonnistui',
        type: 'error' }, 5))
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Lisää uusi blogi</h2>

      <form onSubmit={handleCreate}>
        <label>
          Title:
          <input
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        <br />
        <label>
          Author:
          <input
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
        <br />
        <label>
          Url:
          <input
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
        <br />

        <button id="lisääNappi" onClick={handleCreate}>
          Lisää
        </button>
      </form>
    </div>
  )
}

export default BlogForm
