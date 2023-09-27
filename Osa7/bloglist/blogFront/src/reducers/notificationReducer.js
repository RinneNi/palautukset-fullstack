import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', type: null },
  reducers: {
    setN: (state, action) => {
      return {
        message: action.payload.message,
        type: action.payload.type
      }
    },
    clearNotification: (state) => {
      return { message: '', type: null }
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