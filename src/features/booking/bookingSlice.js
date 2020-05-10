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
    'fetchingAvailableDates': false,
    'time': '', // Booking time selected
    'fetchingAvailableTimes': false
	},
  reducers: {
    // loadBooking: state => state,
    // initBooking: (state, action) => action.payload,
    selectService: (state, action) => {
      state.serviceId = action.payload.serviceId;
      state.modalityType = action.payload.modalityType;
    },
    selectDate: (state, action) => {
      state.date = action.payload;
    },
    selectTime: (state, action) => {
      state.time = action.payload;
    }
  }
});

export const {
  selectService,
  selectDate,
  selectTime
} = bookingSlice.actions

export default bookingSlice.reducer;