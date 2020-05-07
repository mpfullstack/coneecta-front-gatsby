import { createSlice } from '@reduxjs/toolkit'

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
		'id': null, // null if is a new booking
		'serviceId': 1, // Selected service
    'modalityType': '', // Modality of the service
		'date': '', // Booking date
		'time': '' // Booking time
	},
  reducers: {
    // loadBooking: state => state,
    // initBooking: (state, action) => action.payload,
    selectService: (state, action) => {
      state.serviceId = action.payload;
    }
  }
});

export const {
  selectService,
} = bookingSlice.actions

export default bookingSlice.reducer;