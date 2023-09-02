import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'
import BlogList from './components/BlogList'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON !== null && loggedUserJSON !== 'null') {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const handleLogout = (event) => {
    event.preventDefault()

    setUser(null)
    window.localStorage.setItem(
      'loggedUser', null
    )
  }

  const loginForm = () => {
    //loginVisible on tilamuuttuja joka kertoo onko lomake näkyvissä vai ei
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          {/*'log in' -painaessa asetetaan loginVisible tila true =>  lomake näkyy. */}
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          {/* LoginForm-komponentti näytetään, kun loginVisible = true. */}
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          {/* 'cancel' -painaessa loginVisible asetetaan false => lomake piilotetaan*/}
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='header'>
        <h1 className='title'>Blogi Sovellus</h1>
        {user &&
      <p>{user.name} logged in <button id='kirjauduUlos' onClick={handleLogout}>Kirjaudu Ulos</button></p>
        }
      </div>
      <Notification message={successMessage} />
      <ErrorNotification message={errorMessage} />


      {loginForm()}
      {user && <BlogList
        blogs={blogs}
        setBlogs={setBlogs}
        user={user}
        blogService={blogService} />}

      {user && (
        <Togglable buttonLabel="Lisää Blogi" ref={blogFormRef}>
          <BlogForm
            blogFormRef={blogFormRef}
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
            setBlogs={setBlogs}
            blogService={blogService}
          />
        </Togglable>
      )}
    </div>
  )
}

export default App
