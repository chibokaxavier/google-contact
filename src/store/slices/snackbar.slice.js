import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: false,
  message: "nothing"
}

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    open: (state) => {
        state.open = true
    },
    close: (state) => {
        state.open = false
    },
    setMessage: (state, action) => {
      state.message = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMessage, open, close } = snackbarSlice.actions

export default snackbarSlice.reducer