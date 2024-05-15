import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // auth state initial values
  },
  reducers: {
    // auth slice reducers
  }
});

export const { /* auth slice actions */ } = authSlice.actions;
export default authSlice.reducer;
