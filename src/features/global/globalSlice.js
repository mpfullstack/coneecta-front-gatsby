import { createSlice } from '@reduxjs/toolkit'

const globalSlice = createSlice({
  name: 'global',
  initialState: {
		'apiError': null
	},
  reducers: {
    showApiError: (state, action) => {
      state.apiError = action.payload;
    },
    hideApiError: state => {
      state.apiError = null;
    },
    handleHeaderClick: state => state
  }
});

export const { showApiError, hideApiError, handleHeaderClick } = globalSlice.actions

export default globalSlice.reducer;