import { createSlice } from '@reduxjs/toolkit'

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    'status': 'pending',
    'credtis': null,
    'checkoutDetails': null
	},
  reducers: {
    reserve: state => {
      state.status = 'processing';
    },
    checkout: (state, action) => {
      state.status = 'processing';
    },
    success: state => {
      state.status = 'pending';
    },
    failed: state => {
      state.status = 'pending';
    },
    updateCredits: (state, action) => {
      state.credits = action.payload;
    },
    updatePaymentCheckoutDetails: (state, action) => {
      state.checkoutDetails = action.payload;
    }
  }
});

export const { reserve, checkout, success, failed, updateCredits, updatePaymentCheckoutDetails } = paymentSlice.actions;

export default paymentSlice.reducer;