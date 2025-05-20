import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: {
    userData: JSON.parse(sessionStorage.getItem("userData")) || null,
  },
  reducers: {
    aboutCompletUser: (state, action) => {
      state.userData = action.payload;
      sessionStorage.setItem("userData", JSON.stringify(action.payload));
      console.log("dado recebido no userReducer:", state.userData);
    },
  },
});

export const { aboutCompletUser } = userSlice.actions;
export default userSlice.reducer;
