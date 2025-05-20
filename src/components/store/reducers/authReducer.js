import { createSlice } from "@reduxjs/toolkit";

const storedToken = sessionStorage.getItem('session-token');

const initialState = {
  token: storedToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = null;
      sessionStorage.clear();
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;