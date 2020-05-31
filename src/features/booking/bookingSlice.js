import { createSlice } from '@reduxjs/toolkit'

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
		'id': null, // null if is a new booking
		'serviceId': null, // Selected service
    'modalityType': '', // Modality of the service
    'timezones': [], // Time zones available to choose
    'availableDates': [], // Dates available for the selected service
    'availableTimes': [], // Times available for the selected service and date
    'timezone': '', // Selected time zone (By default should be the user browser timezone),
    'fetchingTimeZones': true,
    'date': '', // Booking date selected
    'fetchingAvailableDates': true,
    'time': '', // Booking time selected
    'fetchingAvailableTimes': true
	},
  reducers: {
    selectService: (state, action) => {
      state.serviceId = action.payload.serviceId;
      state.modalityType = action.payload.modalityType;
      state.fetchingAvailableDates = true;
      state.fetchingAvailableTimes = true;
      state.fetchingTimeZones = true;
    },
    initAvailableDates: (state, action) => {
      state.availableDates = action.payload;
      state.fetchingAvailableDates = false;
      state.fetchingAvailableTimes = false;
    },
    selectDate: (state, action) => {
      state.date = action.payload;
      // state.fetchingAvailableTimes = true;
    },
    // initAvailableTimes: (state, action) => {
    //   state.availableTimes = action.payload;
    //   state.fetchingAvailableTimes = false;
    // },
    selectTime: (state, action) => {
      state.time = action.payload;
    },
    fetchAvailableTimeZones: state => {
      state.fetchingAvailableDates = true;
      state.fetchingAvailableTimes = true;
      state.fetchingTimeZones = true;
    },
    initAvailableTimeZones: (state, action) => {
      state.timezones = action.payload;
      state.fetchingTimeZones = false;
    },
    selectTimeZone: (state, action) => {
      state.timezone = action.payload;
      state.fetchingAvailableDates = true;
      state.fetchingAvailableTimes = true;
      state.fetchingTimeZones = false;
    }
  }
});

export const {
  selectService,
  selectDate,
  selectTime,
  initAvailableDates,
  // initAvailableTimes,
  selectTimeZone,
  fetchAvailableTimeZones,
  initAvailableTimeZones
} = bookingSlice.actions

export default bookingSlice.reducer;