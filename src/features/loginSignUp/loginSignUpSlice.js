import { createSlice } from '@reduxjs/toolkit'

const loginSignUpSlice = createSlice({
  name: 'loginSignUp',
  initialState: {
		'loginStatus': 'idle', // Login status: idle, loading, error
    'signUpStatus': 'idle', // SignUp status: idle, loading, error
    'signUpErrors': [] // Holds an array of errors of fields form
	},
  reducers: {
    signUp: state => {
      state.signUpStatus = 'loading';
    },
    signedUp: state => {
      state.signUpStatus = 'idle';
    },
    signUpError: (state, action) => {
      state.signUpStatus = 'error';
      state.signUpErrors = action.payload;
    }
  }
});

export const {
  signUp,
  signedUp,
  signUpError
} = loginSignUpSlice.actions

export default loginSignUpSlice.reducer;