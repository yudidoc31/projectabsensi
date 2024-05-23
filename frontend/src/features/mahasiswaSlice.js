// src/features/mahasiswaSlice.js
import { createSlice } from '@reduxjs/toolkit';

const mahasiswaSlice = createSlice({
  name: 'mahasiswa',
  initialState: {
    absensi: []
  },
  reducers: {
    addAbsensi: (state, action) => {
      state.absensi.push(action.payload);
    }
  }
});

export const { addAbsensi } = mahasiswaSlice.actions;
export default mahasiswaSlice.reducer;
