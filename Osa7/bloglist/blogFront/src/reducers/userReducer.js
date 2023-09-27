import { createSlice } from '@reduxjs/toolkit'

const userReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null,
  },
})

export const { setUser, clearUser } = userReducer.actions


export const setLoggedInUser = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user))
  }
}


export default userReducer.reducer
