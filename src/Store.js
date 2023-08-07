import { configureStore } from "@reduxjs/toolkit";
import userRuducer from "./slice/user/userSlice"

export default configureStore({
    reducer: {
        loggeduser: userRuducer 
    },
});
