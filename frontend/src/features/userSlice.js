import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  image: "",
  conversations: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.username = payload.username;
      state.email = payload.email;
      state.image = payload.image;
      state.conversations = [];
    },
    setUserConversations: (state, { payload }) => {
      state.conversations = payload;
    },
  },
});

export const { setUser, setUserConversations } = userSlice.actions;
export default userSlice.reducer;
