import { createSlice } from '@reduxjs/toolkit'

const professionalProfileSlice = createSlice({
  name: 'professionalProfile',
  initialState: {
    'id': null,
    'collapseProfileHeader': false,
		'details': null,
    'services': [],
    'showedServiceId': null, // It indicates which service to show in list of services
    'section': 'serviceList' // serviceList, datePicker
	},
  reducers: {
    loadProfile: state => state,
    initProfile: (state, action) => {
      state.id = action.payload.id;
      state.details = action.payload.details;
      state.services = action.payload.services;
    },
    collapseProfileHeader: (state, action) => {
      state.collapseProfileHeader = action.payload;
    },
    showService: (state, action) => {
      state.showedServiceId = action.payload;
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
  showService,
  changeSection
} = professionalProfileSlice.actions

export default professionalProfileSlice.reducer;