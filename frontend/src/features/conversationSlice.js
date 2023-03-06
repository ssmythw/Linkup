import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversation: "",
  memebers: [],
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversation: (state, { payload }) => {
      state.conversation = payload;
    },
  },
});

export const { setConversation } = conversationSlice.actions;
export default conversationSlice.reducer;
