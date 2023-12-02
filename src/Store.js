import { configureStore } from "@reduxjs/toolkit";
import userRuducer from "./slice/user/userSlice";
import activeChatRuducer from "./slice/activeChat/activechat";
import userimgRuducer from "./slice/userImg/userimg";

export default configureStore({
    reducer: {
        loggeduser: userRuducer,
        activechat: activeChatRuducer,
        userimg: userimgRuducer,
    },
});
