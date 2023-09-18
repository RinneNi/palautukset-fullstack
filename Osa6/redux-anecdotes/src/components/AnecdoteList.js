import { useDispatch, useSelector } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === '' ) {
      return anecdotes
    } else {
      return anecdotes.filter(item => item.content.includes(filter))
    }
  })

  const aanesta = (id, content) => {
    dispatch(vote(id))
    
    // notification
    dispatch(setNotification(`you voted: ${content}`, 10))
  }

  const sorted = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sorted.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => aanesta(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList