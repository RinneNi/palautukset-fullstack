import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import '../index.css'

export const User = () => {
  const { id } = useParams()
  const users = useSelector(state => state.users)
  const user = users.find(user => user.id === id)

  // Uudelleenlataus ei toimi, korjataan ehdolla
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name} {user.username}</h2>
      <h4>Blogs</h4>
      {user.blogs.map(blog => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  )
}