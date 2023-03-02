import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversation: "contractors",
  memebers: [],
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversation: (state, { payload }) => {
      state.conversation = payload.conversation;
    },
    addConverstion: (state, { payload }) => {
      state.members.push(payload);
    },
  },
});

export const { setConversation } = conversationSlice.actions;
export default conversationSlice.reducer;
