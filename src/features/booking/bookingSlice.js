import { createSlice } from '@reduxjs/toolkit'

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
		'id': null, // null if is a new booking
		'serviceId': null, // Selected service
    'modalityType': '', // Modality of the service
    'availableDates': [], // Dates available for the selected service
    'availableTimes': [], // Times available for the selected service and date
    'date': '', // Booking date selected
    'fetchingAvailableDates': true,
    'time': '', // Booking time selected
    'fetchingAvailableTimes': true
	},
  reducers: {
    // loadBooking: state => state,
    // initBooking: (state, action) => action.payload,
    selectService: (state, action) => {
      state.serviceId = action.payload.serviceId;
      state.modalityType = action.payload.modalityType;
      state.fetchingAvailableDates = true;
      state.fetchingAvailableTimes = true;
    },
    initAvailableDates: (state, action) => {
      state.availableDates = action.payload;
      state.fetchingAvailableDates = false;
    },
    selectDate: (state, action) => {
      state.date = action.payload;
      state.fetchingAvailableTimes = true;
      // state.time = '';
    },
    initAvailableTimes: (state, action) => {
      state.availableTimes = action.payload;
      state.fetchingAvailableTimes = false;
    },
    selectTime: (state, action) => {
      state.time = action.payload;
    }
  }
});

export const {
  selectService,
  selectDate,
  selectTime,
  initAvailableDates,
  initAvailableTimes
} = bookingSlice.actions

export default bookingSlice.reducer;