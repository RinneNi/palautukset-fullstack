import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../index.css'

export const Users = () => {
  const users = useSelector(state => state.users)
  return (
    <div>
      <h2>Käyttäjät</h2>
      <div className="user-list">
        {users.map((user) => (
          <Link to={`/users/${user.id}`} key={user.id}>
            <div className="user-card" key={user.id}>
              <div className="user-info">
                <strong>Nimi: {user.name}</strong>
                <p>Käyttäjätunnus: {user.username}</p>
              </div>
              <div className="blog-count">
                <p>Blogien määrä: {user.blogs.length}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}