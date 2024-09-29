"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: 0,
    name: "",
    email: "",
    phone: "",
    role: "",
  },
};

export const logInUserSlice = createSlice({
  name: "logInUser",
  initialState,
  reducers: {
    addLogInUser: (state, action) => {
      state.user.id = action.payload.$id;
      state.user.name = String(action.payload.name);
      state.user.email = String(action.payload.email);
      state.user.phone = String(action.payload.phone);
    },
    
    deleteLogInUser: (state, action) => {
      state.user.id = 0;
      state.user.name = "";
      state.user.email = "";
      state.user.phone = "";
    },
  },
});

export const { addLogInUser, deleteLogInUser } = logInUserSlice.actions;

export default logInUserSlice.reducer;
