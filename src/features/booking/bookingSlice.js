import { createSlice } from '@reduxjs/toolkit'

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
		'id': null, // null if is a new booking
		'serviceId': null, // Selected service
    'modalityType': '', // Modality of the service
    'availableDates': [], // Dates available for the selected service
    'avaialbleTimes': [], // Times available for the selected service and date
		'date': '', // Booking date selected
		'time': '' // Booking time selected
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