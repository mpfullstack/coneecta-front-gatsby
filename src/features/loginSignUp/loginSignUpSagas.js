import { all, takeLatest, put, call, fork, delay } from 'redux-saga/effects';
import {
  signUp,
} from './loginSignUpSlice';
import { showApiError, hideApiError } from '../global/globalSlice';
import api from '../../api';

function* onSignUp() {
  yield takeLatest(signUp, function* ({ payload }) {
    debugger;
    const result = yield call(api.signUp, payload);
    if (result.error) {
      yield put(showApiError(result.error));
      yield delay(5000);
      yield put(hideApiError());
    } else {
      // yield put(initAvailableTimeZones(result));
    }
  });
}

export default function* () {
  yield all([
    fork(onSignUp)
  ])
};