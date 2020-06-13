import { createSlice } from '@reduxjs/toolkit'

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
		'details': null,
    'services': []
	},
  reducers: {
    loadProfile: state => state,
    initProfile: (state, action) => {
      state.details = action.payload.details;
      state.services = action.payload.services;
    },
    loadProfileServices(state, action) {
      return action.payload;
    }
  }
});

export const { loadProfile, loadProfileServices, initProfile } = profileSlice.actions

export default profileSlice.reducer;