import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const usersReducer = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    getUsers: (state, action) => action.payload,
  },
})

export const { getUsers } = usersReducer.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await axios.get('/api/users')
    dispatch(getUsers(users.data))
  }
}

export default usersReducer.reducer