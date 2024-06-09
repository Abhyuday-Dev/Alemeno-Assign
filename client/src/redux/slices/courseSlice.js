import { createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
  name: "course",
  initialState: {
    course: null,
    loading: false,
  },
  reducers: {
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setCourse, setLoading } = courseSlice.actions;

export default courseSlice.reducer;
