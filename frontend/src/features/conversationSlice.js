import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversation: "Global",
  senderUsername: null,
  recipientUsername: null,
  memebers: [],
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversation: (state, { payload }) => {
      state.conversation = payload;
    },
    setUsers: (state, { payload }) => {
      state.senderUsername = payload.senderUsername;
      state.recipientUsername = payload.recipientUsername;
    },
  },
});

export const { setConversation } = conversationSlice.actions;
export default conversationSlice.reducer;
