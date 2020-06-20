import { all, takeLatest, put, call, fork, delay } from 'redux-saga/effects';
import { navigate } from 'gatsby';
import {
  signUp, signedUp, signUpError
} from './loginSignUpSlice';
import { initProfile } from '../profile/profileSlice';
import { showApiError, hideApiError } from '../global/globalSlice';
import api from '../../api';

function* onSignUp() {
  yield takeLatest(signUp, function* ({ payload }) {
    const result = yield call(api.signUp, payload);
    if (result.error) {
      if (result.error.code === 'invalid_signup_data') {
        yield put(signUpError(result.error.details));
      } else {
        yield put(showApiError(result.error));
        yield delay(5000);
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
    fork(onSignUp)
  ])
};