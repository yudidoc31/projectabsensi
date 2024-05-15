import { createSlice } from '@reduxjs/toolkit';

const mahasiswaSlice = createSlice({
  name: 'mahasiswa',
  initialState: {
    // mahasiswa state initial values
  },
  reducers: {
    // mahasiswa slice reducers
  }
});

export const { /* mahasiswa slice actions */ } = mahasiswaSlice.actions;
export default mahasiswaSlice.reducer;
