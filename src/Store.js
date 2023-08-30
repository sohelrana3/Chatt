import { configureStore } from "@reduxjs/toolkit";
import userRuducer from "./slice/user/userSlice"
import activeChatRuducer from "./slice/activeChat/activechat";

export default configureStore({
    reducer: {
        loggeduser: userRuducer ,
        activechat: activeChatRuducer,
    },
});
