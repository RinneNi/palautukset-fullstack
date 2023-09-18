import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setN: (state, action) => {
      return action.payload
    },
    clearNotification: (state) => {
      return null
    }
  }
})

export const { setN, clearNotification } = notificationSlice.actions

export const setNotification = (info, time) => {
  const aika = time * 1000
  return async dispatch => {
    dispatch(setN(info))
    setTimeout(() => {
      dispatch(clearNotification())
    }, aika)
  }
}
export default notificationSlice.reducer