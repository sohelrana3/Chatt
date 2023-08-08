import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    loginUser: localStorage.getItem("user") ?JSON.parse(localStorage.getItem("user")):null,
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