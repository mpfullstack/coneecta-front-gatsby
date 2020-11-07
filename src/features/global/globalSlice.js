import { createSlice } from '@reduxjs/toolkit'

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    'apiError': null,
    'alert': null,
    'countries': []
	},
  reducers: {
    showApiError: (state, action) => {
      const { code } = action.payload;
      state.apiError = code || action.payload;
    },
    hideApiError: state => {
      state.apiError = null;
    },
    showAlert: (state, action) => {
      state.alert = action.payload;
    },
    hideAlert: state => {
      state.alert = null;
    },
    // TODO: May not be necessary as click event on logo will take user
    // to coneecta.com page
    handleHeaderClick: state => state,
    updateCountries: (state, action) => {
      state.countries = action.payload;
    }
  }
});

export const {
  showApiError, hideApiError, handleHeaderClick,
  updateCountries, showAlert, hideAlert
} = globalSlice.actions

export const API_ERROR_DURATION = 10000;

export default globalSlice.reducer;