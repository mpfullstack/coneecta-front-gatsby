import { createSlice } from '@reduxjs/toolkit'

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    'status': 'pending',
		'details': null
	},
  reducers: {
    loadProfile: state => {
      state.status = 'loading';
    },
    initProfile: (state, action) => {
      state.status = 'loaded';
      state.details = action.payload
    },
    resetProfile: state => {
      state.status = 'pending';
      state.details = null;
    }
  }
});

export const { loadProfile, initProfile, resetProfile } = profileSlice.actions;

export default profileSlice.reducer;