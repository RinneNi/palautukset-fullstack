import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteSuccess: (state, action) => {
      const { id, votedAnecdote } = action.payload
      return state.map((anecdote) =>
      anecdote.id === id ? votedAnecdote: anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { voteSuccess, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = (id) => {
  return async dispatch => {
    const anecdoteToVote = await anecdoteService.getOne(id)
    anecdoteToVote.votes += 1
    const votedAnecdote = await anecdoteService.putOne(id, anecdoteToVote)
    dispatch(voteSuccess({ id: id, votedAnecdote: votedAnecdote }))
  }
}

export default anecdoteSlice.reducer