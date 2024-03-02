import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    credentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      localStorage.setItem("expirationDate", expirationDate.toISOString());
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { credentials, logout } = authSlice.actions;
export default authSlice.reducer;
