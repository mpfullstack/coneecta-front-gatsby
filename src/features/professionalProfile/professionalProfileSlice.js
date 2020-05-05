import { createSlice } from '@reduxjs/toolkit'

const professionalProfileSlice = createSlice({
  name: 'professionalProfile',
  initialState: {
    'collapseProfileHeader': false,
		'details': null,
    'services': []
	},
  reducers: {
    loadProfile: state => state,
    initProfile: (state, action) => {
      state.details = action.payload.details;
      state.services = action.payload.services;
    },
    collapseProfileHeader: state => {
      state.collapseProfileHeader = true;
    }
  }
});

export const { loadProfile, initProfile, collapseProfileHeader } = professionalProfileSlice.actions

export default professionalProfileSlice.reducer;