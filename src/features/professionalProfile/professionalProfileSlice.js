import { createSlice } from '@reduxjs/toolkit'

const professionalProfileSlice = createSlice({
  name: 'professionalProfile',
  initialState: {
    'id': null,
    'collapseProfileHeader': false,
		'details': null,
    'services': [],
    'section': 'serviceList' // serviceList, datePicker
	},
  reducers: {
    loadProfile: state => state,
    initProfile: (state, action) => {
      state.id = action.payload.id;
      state.details = action.payload.details;
      state.services = action.payload.services;
    },
    collapseProfileHeader: state => {
      state.collapseProfileHeader = true;
    },
    changeSection: (state, action) => {
      state.section = action.payload;
    }
  }
});

export const {
  loadProfile,
  initProfile,
  collapseProfileHeader,
  changeSection
} = professionalProfileSlice.actions

export default professionalProfileSlice.reducer;