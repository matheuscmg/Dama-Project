import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projectData: JSON.parse(sessionStorage.getItem("projectData")) || null
  },
  reducers: {
    aboutProjecMoment: (state, action) => {
      state.projectData = action.payload;
      sessionStorage.setItem("projectData", JSON.stringify(action.payload));
    }
  }
});

export const { aboutProjecMoment } = projectSlice.actions;
export default projectSlice.reducer;
