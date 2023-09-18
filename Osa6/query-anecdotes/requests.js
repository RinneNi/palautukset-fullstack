import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes/'

export const getAll = () =>
  axios.get(baseUrl)
    .then(res => res.data)

export const addNew = newAnecdote =>
  axios.post(baseUrl, newAnecdote)
    .then(res => res.data)

export const updateOld = updatedAnecdote =>
  axios.put((baseUrl+updatedAnecdote.id), updatedAnecdote)
    .then(res => res.data)