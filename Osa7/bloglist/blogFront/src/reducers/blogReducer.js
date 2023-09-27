import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    delBlog: (state, action) => {
      const blogIdToDelete = action.payload
      return state.filter(blog => blog.id !== blogIdToDelete)
    },
    likBlog: (state, action) => {
      const blogIdToLike = action.payload
      return state.map((blog) =>
        blog.id === blogIdToLike
          ? { ...blog, likes: blog.likes + 1 }
          : blog
      )
    },
    addNew: (state, action) => {
      const newBlogs = [...state, action.payload]
      newBlogs.sort((a, b) => b.likes - a.likes)
      return newBlogs
    },
    addComment: (state, action) => {
      const uusBlog = action.payload
      const updatedBlogs = state.map(blog =>
        blog.id === uusBlog.id ? uusBlog : blog
      )
      return updatedBlogs
    },
  }
})

export const { setBlogs, delBlog, likBlog, addNew, addComment } = blogReducer.actions

// THUNK
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(blogs))
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog.id)
    dispatch(delBlog(blog.id))
  }
}

export const likeBlog = (id, blog) => {
  return async dispatch => {
    await blogService.update(id, blog)
    dispatch(likBlog(id))
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const added = await blogService.create(blog)
    dispatch(addNew(added.blog))
  }
}

export const kommenttiThunk = (blog) => {
  return async dispatch => {
    dispatch(addComment(blog))
  }
}

export default blogReducer.reducer
