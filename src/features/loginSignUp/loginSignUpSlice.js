import { createSlice } from '@reduxjs/toolkit'

const loginSignUpSlice = createSlice({
  name: 'loginSignUp',
  initialState: {
    'loginStatus': 'idle', // Login status: idle, loading, error
    'loginErrors': [], // Holds an array of errors in login form fields
    'signUpStatus': 'idle', // SignUp status: idle, loading, error
    'signUpErrors': [], // Holds an array of errors in signup form fields
    'resetPasswordStatus': 'idle', // Reset password status: idle, loading, error
    'resetPasswordErrors': [] // Holds an array of errors in reset password form fields
	},
  reducers: {
    login: state => {
      state.loginStatus = 'loading';
    },
    logout: () => {},
    loggedIn: state => {
      state.loginStatus = 'idle';
    },
    loginError: (state, action) => {
      state.loginStatus = 'error';
      state.loginErrors = action.payload;
    },
    resetLoginStatus: state => {
      state.loginStatus = 'idle';
    },
    signUp: state => {
      state.signUpStatus = 'loading';
    },
    signedUp: state => {
      state.signUpStatus = 'idle';
    },
    signUpError: (state, action) => {
      state.signUpStatus = 'error';
      state.signUpErrors = action.payload;
    },
    resetSignUpStatus: state => {
      state.signUpStatus = 'idle';
    },
    requestPasswordReset: state => {
      state.resetPasswordStatus = 'loading';
    },
    passwordResetRequested: state => {
      state.resetPasswordStatus = 'idle';
    },
    passwordResetError: (state, action) => {
      state.resetPasswordStatus = 'error';
      state.resetPasswordErrors = action.payload;
    }
  }
});

export const {
  login,
  logout,
  loggedIn,
  loginError,
  resetLoginStatus,
  signUp,
  signedUp,
  signUpError,
  resetSignUpStatus,
  requestPasswordReset,
  passwordResetRequested
} = loginSignUpSlice.actions

export default loginSignUpSlice.reducer;