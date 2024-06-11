import { createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
  name: "course",
  initialState: {
    course: null,
    courses: [],
    filteredCourses: [],
    searchQuery: "",
    loading: false,
  },
  reducers: {
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
      state.filteredCourses = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredCourses = state.courses.filter((course) =>
        course.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const { setCourse, setCourses, setLoading, setSearchQuery, updateCourseLikes } = courseSlice.actions;

export default courseSlice.reducer;
