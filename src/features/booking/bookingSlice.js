import { createSlice } from '@reduxjs/toolkit'

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
		'id': null, // null if is a new booking
		'serviceId': null, // Selected service
    'modalityType': '', // Modality of the service
		'date': '', // Booking date
		'time': '' // Booking time
	},
  reducers: {
    // loadBooking: state => state,
    // initBooking: (state, action) => action.payload,
    selectService: (state, action) => {
      state.serviceId = action.payload.serviceId;
      state.modalityType = action.payload.modalityType;
    }
  }
});

export const {
  selectService,
} = bookingSlice.actions

export default bookingSlice.reducer;