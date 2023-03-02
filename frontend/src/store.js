import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import conversationReducer from "./features/conversationSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    conversation: conversationReducer,
  },
});
