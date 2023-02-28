import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  image: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.username = payload.username;
      state.email = payload.email;
      state.image = payload.image;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
