import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    userData: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      state.userData = null;
    },
  },
});

export const { setToken, setUserData, clearToken } = authSlice.actions;
export default authSlice.reducer;
