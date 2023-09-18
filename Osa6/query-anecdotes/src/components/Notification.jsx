import React, { useContext } from "react"
import NotificationContext from "../../NotificationContext"

// eslint-disable-next-line
export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload
    case 'HIDE':
      return null
    default:
      return state
  }
}

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if ( notification === null ) return ( null )

  return (
    <div style={style}> 
      {notification}
    </div>
  )
}

export default Notification
