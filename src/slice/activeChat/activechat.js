import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        activechat: localStorage.getItem("activeChat")
            ? JSON.parse(localStorage.getItem("activeChat"))
            : null,
    },
    reducers: {
        activechat: (state, actions) => {
            state.activechat = actions.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { activechat } = chatSlice.actions;

export default chatSlice.reducer;
