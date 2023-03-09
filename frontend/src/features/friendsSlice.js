import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversation: "",
};

export const friendSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriend: (state, { payload }) => {
      state.conversation = payload;
    },
  },
});

export const { setFriend } = friendSlice.actions;
export default conversationSlice.reducer;
