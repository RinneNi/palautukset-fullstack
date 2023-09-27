import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// Services
import blogService from './services/blogs'
import loginService from './services/login'
// Components
import Notification from './components/Notification'
import { Menu } from './components/Menu'
import LoginForm from './components/LoginForm'
// Reducers
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setLoggedInUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
// Pages
import { Users } from './pages/Users'
import { Blogs } from './pages/Blogs'
import { User } from './pages/User'
import { Yksi } from './pages/Yksi'
// Styles
import './index.css'
import styled from 'styled-components'

const Button = styled.button`
  background: #4d4646;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
  color: white;
`

const Page = styled.div`
  background: #FFC71C;
  width: 100%;
  height: 100%;
`

const Footer = styled.div`
  background: Chocolate;
  color: #fff;
  text-align: center;
  padding: 20px 0;
  width: 100%;
`

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)


  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON !== null && loggedUserJSON !== 'null') {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      dispatch(setLoggedInUser(user))
    }
    // eslint-disable-next-line
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      dispatch(setLoggedInUser(user))

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification({
        message: 'wrong credentials',
        type: 'error' }, 5))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    setUser(null)
    window.localStorage.setItem('loggedUser', null)
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
    <Page>
      <Router>
        <div>
          <div className="header">
            <h1 className="title">Blogi Sovellus</h1>
            <Menu />
            {user && (
              <p>
                {user.username} logged in{' '}
                <Button id="kirjauduUlos" onClick={handleLogout}>
                  Kirjaudu Ulos
                </Button>
              </p>
            )}
          </div>
          <Notification />

          {!user && loginForm()}
          <Routes>
            <Route path='/users' element={<Users />} />
            <Route path='/' element={<Blogs />} />
            <Route path='/users/:id' element={<User />} />
            <Route path='/blogs/:id' element={<Yksi />} />
          </Routes>
        </div>
      </Router>
      <Footer>
          Moi
      </Footer>
    </Page>
  )
}

export default App
