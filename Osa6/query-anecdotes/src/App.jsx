import { useReducer } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification, { notificationReducer } from './components/Notification'
import { getAll, updateOld } from '../requests'
import NotificationContext from '../NotificationContext'

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    retry: 1
  })

  if ( result.isLoading ) {
    return <div>Ladataan..</div>
  }

  if ( result.isError ) {
    return <span>anecdote service not available due to problems in server</span>
  }

  const anecdotes = result.data

  const handleVote = async (anecdote) => {
    const voted = { ...anecdote, votes: anecdote.votes + 1 }
    try {
      updateOld(voted)
      queryClient.invalidateQueries(['anecdotes'])
      notificationDispatch({ type: 'SHOW', payload: `you voted ${anecdote.content}` })
  
      setTimeout(() => {
        notificationDispatch({ type: 'HIDE' })
      }, 5000)
    } catch (error) {
      console.log('Äänestäminen epäonnistui')
    }
  }

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
