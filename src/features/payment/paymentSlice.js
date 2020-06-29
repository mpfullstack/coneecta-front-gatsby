import { createSlice } from '@reduxjs/toolkit'

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    'status': 'pending',
		'details': null
	},
  reducers: {
    pay: state => {
      state.status = 'processing';
    },
    success: state => {
      state.status = 'pending';
    }
  }
});

export const { pay, success } = paymentSlice.actions;

export default paymentSlice.reducer;