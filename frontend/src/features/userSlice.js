import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    email: "",
    image: ""
}

export const userSlice = createSlice({
  name: "user",
  initialState: ,
  reducers: {
    setUser: (state, payload) => {

    }
  }
});
