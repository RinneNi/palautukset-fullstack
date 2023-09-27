import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

// Vain moduulin sisällä näkyvä muuttuja token jolle asetetaan arvo
// moduulin exportaamalla funktiolla setToken
let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}
// Blogin lisääminen
// create myös exportataan, sitä käytetään handeCreate funktiossa
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

// Blogin tykkääminen ( muokkaaminen )
const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const Url = `${baseUrl}/${id}`
  const res = await axios.put(Url, newObject, config)
  return res.data
}

// Poisto
const deleteBlog = async (id) => {
  try {
    const config = {
      headers: { Authorization: token },
    }
    const Url = `${baseUrl}/${id}`
    const res = await axios.delete(Url, config)
    return res.data
  } catch (error) {
    console.log('ei onnistunut', error)
    throw error
  }
}

// Kommentointi
const addComment = async (id, kommentti) => {
  try {
    const res = await axios.post(`${baseUrl}/${id}/comments`, kommentti)
    return res.data
  } catch (error) {
    return null
  }
}

export default { getAll, create, setToken, update, deleteBlog, addComment }
