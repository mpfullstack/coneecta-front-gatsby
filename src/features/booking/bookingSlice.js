import { createSlice } from '@reduxjs/toolkit'

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
		'id': null, // null if is a new booking
		'serviceId': null, // Selected service
    'modalityType': '', // Modality of the service
    'timezones': [], // Time zones available to choose
    'availableDates': [], // Dates available for the selected service
    'timezone': '', // Selected time zone (By default should be the user browser timezone)
    'date': '', // Booking date selected
    'time': '', // Booking time selected
    'isTimeAvailable': false, // Indicates if selected time is really available
    'fetchingTimeZones': true,
    'fetchingAvailableDates': true
	},
  reducers: {
    selectService: (state, action) => {
      state.serviceId = action.payload.serviceId;
      state.modalityType = action.payload.modalityType;
      state.fetchingAvailableDates = true;
      state.fetchingTimeZones = true;
    },
    initAvailableDates: (state, action) => {
      state.availableDates = action.payload;
      state.fetchingAvailableDates = false;
    },
    selectDate: (state, action) => {
      state.date = action.payload;
    },
    selectTime: (state, action) => {
      state.time = action.payload.value;
      state.isTimeAvailable = action.payload.available;
    },
    fetchAvailableTimeZones: state => {
      state.fetchingAvailableDates = true;
      state.fetchingTimeZones = true;
    },
    initAvailableTimeZones: (state, action) => {
      state.timezones = action.payload;
      state.fetchingTimeZones = false;
    },
    selectTimeZone: (state, action) => {
      state.timezone = action.payload;
      state.fetchingAvailableDates = true;
    }
  }
});

export const {
  selectService,
  selectDate,
  selectTime,
  initAvailableDates,
  selectTimeZone,
  fetchAvailableTimeZones,
  initAvailableTimeZones
} = bookingSlice.actions

export default bookingSlice.reducer;