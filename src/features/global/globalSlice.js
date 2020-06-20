import { createSlice } from '@reduxjs/toolkit'

const globalSlice = createSlice({
  name: 'global',
  initialState: {
		'apiError': null
	},
  reducers: {
    showApiError: (state, action) => {
      const { code } = action.payload;
      state.apiError = code || action.payload;
    },
    hideApiError: state => {
      state.apiError = null;
    },
    // TODO: May not be necessary as click event on logo will take user
    // to coneecta.com page
    handleHeaderClick: state => state
  }
});

export const { showApiError, hideApiError, handleHeaderClick } = globalSlice.actions

export const API_ERROR_DURATION = 10000;

export default globalSlice.reducer;