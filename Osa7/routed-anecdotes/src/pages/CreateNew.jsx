import { useNavigate } from 'react-router-dom'
import useField from '../hooks/index'
// eslint-disable-next-line
const Create = ({ addNew, setNotification }) => {
  const navigate = useNavigate()
  const { reset: resetContent, ...content } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetInfo, ...info } = useField('text')


  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')

    setNotification(`a new anecdote: ${content.value} created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000);

  }

  const handleReset = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content
          <input {...content} />
        </div>
        <div>
          Author
          <input {...author} />
        </div>
        <div>
          URL for more info
          <input {...info} />
        </div>
        <button>Create</button>
      </form>
        <button onClick={handleReset}>reset</button>
    </div>
  )
}

export default Create