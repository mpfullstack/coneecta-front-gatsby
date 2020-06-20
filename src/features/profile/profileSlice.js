import { createSlice } from '@reduxjs/toolkit'

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
		'details': null
	},
  reducers: {
    loadProfile: state => state,
    initProfile: (state, action) => {
      state.details = action.payload
    }
  }
});

export const { loadProfile, initProfile } = profileSlice.actions

export default profileSlice.reducer;