import { useRef } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'

import BlogList from '../components/BlogList'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Toggable'

export const Blogs = () => {
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  if ( user === null ) {
    return null
  }

  return (
    <div>
      <BlogList />
      <Togglable buttonLabel="Lisää Blogi" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
    </div>
  )
}
