import { all, takeLatest, put, call, fork } from 'redux-saga/effects';
import Query from '../../helpers/query';
import { navigate } from 'gatsby';
import { login as loginUser, logout as logoutUser } from '../../helpers/authentication';
import {
  login, logout, loggedIn, loginError, signUp, signedUp, signUpError,
  resetLoginStatus, resetSignUpStatus
} from './loginSignUpSlice';
import { initProfile, resetProfile } from '../profile/profileSlice';
import { showApiError, updateCountries } from '../global/globalSlice';
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
      }
    } else {
      const countriesResult = yield call(api.getCountries);
      if (!countriesResult.error) {
        yield put(updateCountries(countriesResult));
      }
      // Handle login OK
      yield put(loggedIn());
      yield put(initProfile(result));
      yield loginUser();
      const params = Query.getParams(window.location);
      yield navigate(`/profile/payment?slug=${params.slug}`);
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
      }
    } else {
      // Handle singup OK
      yield put(signedUp());
      yield put(initProfile(result));
      yield loginUser();
      const params = Query.getParams(window.location);
      yield navigate(`/profile/payment?slug=${params.slug}`);
    }
  });
}

function* onLogout() {
  yield takeLatest(logout, function* ({ payload }) {
    const result = yield call(api.logout);
    if (result.error) {
      // User is already logged out
      if (result.status === 403) {
        yield put(resetProfile());
        yield logoutUser();
        if (payload.redirect) {
          yield navigate(`/login`);
        }
      } else {
        // TODO: Handle error.
        // NOTE: We do nothing so far.
      }
    } else {
      // Handle logout OK
      yield put(resetProfile());
      yield logoutUser();
      if (payload.redirect) {
        yield navigate(`/login`);
      }
    }
  });
}

export default function* () {
  yield all([
    fork(onLogin),
    fork(onSignUp),
    fork(onLogout)
  ])
};