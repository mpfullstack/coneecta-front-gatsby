import { createSlice } from '@reduxjs/toolkit'

const professionalProfileSlice = createSlice({
  name: 'professionalProfile',
  initialState: {
		'details': null,
    'services': []
	},
  reducers: {
    loadProfile: state => state,
    initProfile: (state, action) => {
      state.details = action.payload.details;
      state.services = action.payload.services;
    }
  }
});

export const { loadProfile, initProfile } = professionalProfileSlice.actions

export default professionalProfileSlice.reducer;