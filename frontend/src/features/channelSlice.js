import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channel: "",
};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setChannel: (state, { payload }) => {
      state.channel = payload.channel;
    },
  },
});

export const { setChannel } = channelSlice.actions;
export default channelSlice.reducer;
