import { createSlice } from '@reduxjs/toolkit'

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
		'details': null
	},
  reducers: {
    loadProfessionalProfile: state => state,
    initProfile: (state, action) => {
      state.details = action.payload
    }
  }
});

export const { loadProfessionalProfile, initProfile } = profileSlice.actions

export default profileSlice.reducer;