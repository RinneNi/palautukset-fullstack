import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes/'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async (content) => {
  const object = {
    content: content,
    votes: 0
  }
  const res = await axios.post(baseUrl, object)
  return res.data
}

const getOne = async (id) => {
  const res = await axios.get(baseUrl + id)
  return res.data
}

const putOne = async (id, content) => {
  const res = await axios.put(baseUrl + id, content)
  return res.data
}

// eslint-disable-next-line
export default {
  getAll,
  createNew,
  getOne,
  putOne
}