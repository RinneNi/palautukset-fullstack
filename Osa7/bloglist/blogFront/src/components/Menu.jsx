import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Nappi = styled.button`
  background: #f5e4cb;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
  color: white;
  font-weight: bold;
`

export const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Nappi>
        <Link style={padding} to="/">blogs</Link>
      </Nappi>
      <Nappi>
        <Link style={padding} to="/users">users</Link>
      </Nappi>
    </div>
  )
}