import { createSlice } from '@reduxjs/toolkit'

const loginSignUpSlice = createSlice({
  name: 'loginSignUp',
  initialState: {
    'loginStatus': 'idle', // Login status: idle, loading, error
    'loginErrors': [], // Holds an array of errors in login form fields
    'signUpStatus': 'idle', // SignUp status: idle, loading, error
    'signUpErrors': [], // Holds an array of errors in signup form fields
    'passordResetStatus': 'idle', // Reset password status: idle, loading, error
    'passwordResetErrors': [] // Holds an array of errors in reset password form fields
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
      state.passordResetStatus = 'loading';
    },
    passwordResetRequested: state => {
      state.passordResetStatus = 'idle';
    },
    passwordResetError: (state, action) => {
      state.passordResetStatus = 'error';
      state.passwordResetErrors = action.payload;
    },
    passwordReset: (state) => {
      state.passordResetStatus = 'loading';
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
  passwordResetRequested,
  passwordResetError,
  passwordReset
} = loginSignUpSlice.actions

export default loginSignUpSlice.reducer;