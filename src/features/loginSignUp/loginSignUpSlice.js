import { createSlice } from '@reduxjs/toolkit'

const loginSignUpSlice = createSlice({
  name: 'loginSignUp',
  initialState: {
		'loginStatus': 'idle', // Login status: idle, loading, error
		'signUpStatus': 'idle' // SignUp status: idle, loading, error
	},
  reducers: {
    signUp: state => {
      state.signUpStatus = 'loading'
    }
  }
});

export const {
  signUp
} = loginSignUpSlice.actions

export default loginSignUpSlice.reducer;