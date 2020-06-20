import { all, takeLatest, put, call, fork, delay } from 'redux-saga/effects';
import { navigate } from 'gatsby';
import {
  login, loggedIn, loginError, signUp, signedUp, signUpError,
  resetLoginStatus, resetSignUpStatus
} from './loginSignUpSlice';
import { initProfile } from '../profile/profileSlice';
import { showApiError, hideApiError, API_ERROR_DURATION } from '../global/globalSlice';
import api from '../../api';

function* onLogin() {
  yield takeLatest(login, function* ({ payload }) {
    const result = yield call(api.login, payload);
    if (result.error) {
      if (result.error.code === 'invalid_authentication_data') {
        yield put(loginError([
          { field: 'email', error: 'invalid_authentication_data' },
          { field: 'password', error: 'invalid_authentication_data' }
        ]));
      } else {
        yield put(resetLoginStatus());
        yield put(showApiError(result.error));
        yield delay(API_ERROR_DURATION);
        yield put(hideApiError());
      }
    } else {
      // Handle login OK
      yield put(loggedIn());
      yield put(initProfile(result));
      yield navigate('/profile/payment');
    }
  });
}

function* onSignUp() {
  yield takeLatest(signUp, function* ({ payload }) {
    const result = yield call(api.signUp, payload);
    if (result.error) {
      if (result.error.code === 'invalid_signup_data') {
        yield put(signUpError(result.error.details));
      } else {
        yield put(resetSignUpStatus());
        yield put(showApiError(result.error));
        yield delay(API_ERROR_DURATION);
        yield put(hideApiError());
      }
    } else {
      // Handle singup OK
      yield put(signedUp());
      yield put(initProfile(result));
      yield navigate('/profile/payment');
    }
  });
}

export default function* () {
  yield all([
    fork(onLogin),
    fork(onSignUp)
  ])
};