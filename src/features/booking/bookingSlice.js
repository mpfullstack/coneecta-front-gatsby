import { createSlice } from '@reduxjs/toolkit'

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    'id': null, // Holds a session id (a booking already done)
		'serviceId': null, // Selected service
    'modalityType': '', // Modality of the service
    'timezones': [], // Time zones available to choose
    'availableDates': [], // Dates available for the selected service
    'timezone': '', // Selected time zone (By default should be the user browser timezone)
    'date': '', // Booking date selected
    'time': '', // Booking time selected
    'isTimeAvailable': false, // Indicates if selected time is really available
    'fetchingTimeZones': true,
    'fetchingAvailableDates': true,
    'timelimits': {}, // Some time limits to take into account on booking actions
    'showSessionAlert': false,
    'sessionAlertMessage': '', // Alert message content
    'keepGoingAfterShowingAlert': false // Indicates if user should continue navigation after showing alert
	},
  reducers: {
    setBookingId: (state, action) => {
      state.id = action.payload;
    },
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
      if (state.serviceId) {
        state.fetchingAvailableDates = true;
      }
      state.fetchingTimeZones = true;
    },
    initAvailableTimeZones: (state, action) => {
      state.timezones = action.payload;
      state.fetchingTimeZones = false;
    },
    selectTimeZone: (state, action) => {
      state.timezone = action.payload;
      if (state.serviceId) {
        state.fetchingAvailableDates = true;
      }
    },
    getTimeLimits: () => {},
    setTimeLimits: (state, action) => {
      state.timelimits = action.payload;
    },
    showSessionAlert: (state, action) => {
      state.showSessionAlert = true;
      state.sessionAlertMessage = action.payload.message;
      state.keepGoingAfterShowingAlert = action.payload.keepGoing;
    },
    hideSessionAlert: state => {
      state.showSessionAlert = false;
      state.sessionAlertMessage = '';
      state.keepGoingAfterShowingAlert = false;
    },
    clearBooking: state => {
      state.id = null;
      state.serviceId = null;
      state.modalityType = '';
      state.date = '';
      state.time = '';
      state.isTimeAvailable = false;
      state.availableDates = [];
    }
  }
});

export const {
  setBookingId,
  selectService,
  selectDate,
  selectTime,
  initAvailableDates,
  selectTimeZone,
  fetchAvailableTimeZones,
  initAvailableTimeZones,
  getTimeLimits,
  setTimeLimits,
  showSessionAlert,
  hideSessionAlert,
  clearBooking
} = bookingSlice.actions

export default bookingSlice.reducer;