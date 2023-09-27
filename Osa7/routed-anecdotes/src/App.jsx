import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route,
} from 'react-router-dom'

// Pages
import { Footer } from './pages/Footer'
import { About } from './pages/About'
import Create from './pages/CreateNew'
// Components
import { Menu } from './components/Menu'
import { Anecdote } from './components/Anecdote'
import { AnecdoteList } from './components/AnecdoteList'


const App = () => {
  const [notification, setNotification] = useState('')
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
         {notification ?
         <>{notification}</>
        :
        null
        }
        <Routes>
          <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<Create addNew={addNew} setNotification={setNotification} />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    )
  }
  
  export default App