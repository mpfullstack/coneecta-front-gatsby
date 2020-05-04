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
    }
  }
});

export const { showApiError, hideApiError } = globalSlice.actions

export default globalSlice.reducer;