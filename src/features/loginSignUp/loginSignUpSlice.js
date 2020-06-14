import { createSlice } from '@reduxjs/toolkit'

const loginSignUpSlice = createSlice({
  name: 'loginSignUp',
  initialState: {
		'loginStatus': '', // Login status: idle, loading, error
		'signUpStatus': '' // SignUp status: idle, loading, error
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