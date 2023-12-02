import { createSlice } from "@reduxjs/toolkit";

export const imgSlice = createSlice({
    name: "userimg",
    initialState: {
        userimg: null,
    },
    reducers: {
        userimg: (state, actions) => {
            state.userimg = actions.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { userimg } = imgSlice.actions;

export default imgSlice.reducer;
