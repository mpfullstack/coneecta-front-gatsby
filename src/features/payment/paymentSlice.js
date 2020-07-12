import { createSlice } from '@reduxjs/toolkit'

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    'status': 'pending',
		'details': null
	},
  reducers: {
    reserve: state => {
      state.status = 'processing';
    },
    pay: state => {
      state.status = 'processing';
    },
    success: state => {
      state.status = 'pending';
    },
    failed: state => {
      state.status = 'pending';
    }
  }
});

export const { reserve, pay, success, failed } = paymentSlice.actions;

export default paymentSlice.reducer;