import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addNew } from "../../requests"
import { useContext, useState } from "react"
import NotificationContext from "../../NotificationContext"

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const [tulostus, setTulostus] = useState('')
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(addNew, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })

      dispatch({ type: 'SHOW', payload: `you added ${tulostus}` })
  
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 5000)
    },
    onError: () => {
      dispatch({ type: 'SHOW', payload: 'too short anecdote, must have length 5 or more' })
  
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 5000)
    }
  })
  

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length <= 5) {
      dispatch({ type: 'SHOW', payload: 'too short anecdote, must have length 5 or more' })
  
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 5000)
    } else {
      newAnecdoteMutation.mutate({ content, votes: 0 })
      setTulostus(content)
    }
  } 

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
