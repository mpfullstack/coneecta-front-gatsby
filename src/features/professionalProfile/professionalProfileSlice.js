import { createSlice } from '@reduxjs/toolkit'

const professionalProfileSlice = createSlice({
  name: 'professionalProfile',
  initialState: {
    'collapseProfileHeader': false,
		'details': null,
    'services': [],
    'section': 'services',
    'booking': { // Here? Or create a new reducer?
      'id': null, // null if is a new booking
      'serviceId': null, // Selected service
      'date': '', // Booking date
      'time': '' // Booking time
    }
	},
  reducers: {
    loadProfile: state => state,
    initProfile: (state, action) => {
      state.details = action.payload.details;
      state.services = action.payload.services;
    },
    collapseProfileHeader: state => {
      state.collapseProfileHeader = true;
    },
    selectService: (state, action) => {
      state.booking.serviceId = action.payload;
    }
  }
});

export const {
  loadProfile,
  initProfile,
  collapseProfileHeader,
  selectService
} = professionalProfileSlice.actions

export default professionalProfileSlice.reducer;