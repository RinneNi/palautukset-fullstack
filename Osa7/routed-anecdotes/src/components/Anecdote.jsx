import { useParams } from "react-router-dom"
// eslint-disable-next-line
export const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  // eslint-disable-next-line
  const ane = anecdotes.find(anecdote => anecdote.id === Number(id))
  
  return (
    <div>
      <h3>{ane.content}</h3>
    </div>
  )
}