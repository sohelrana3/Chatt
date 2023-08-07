import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    loginUser: null,
  },
  reducers: {
    loginData: (state, actions) => {
      console.log("ami ruduc");
      state.loginUser = actions.payload
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { loginData } = counterSlice.actions

export default counterSlice.reducer