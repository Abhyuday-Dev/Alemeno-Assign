import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  userEmail: null,
  userName: null,
  userId:null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.isLoading = action.payload.isLoading;
      state.userEmail = action.payload.userEmail;
      state.userName = action.payload.userName;
      state.userId = action.payload.userId;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    clearUser(state) {
      state.isLoading = false;
      state.userEmail = null;
      state.userName = null;
      state.userId =null;
    },
  },
});

export const { setUser, setLoading, clearUser } = userSlice.actions;

export default userSlice.reducer;
