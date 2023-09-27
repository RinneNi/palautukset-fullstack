import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const getStyle = () => {
    if (!notification.type) {
      return {}
    }
    if (notification.type === 'success') {
      return 'green'
    }
    else {
      return 'red'
    }
  }

  if (!notification.message) {
    return null
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    backgroundColor: getStyle(),
  }
  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification