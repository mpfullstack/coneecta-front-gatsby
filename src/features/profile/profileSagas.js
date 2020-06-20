import { all, takeLatest, put, call, fork, delay } from 'redux-saga/effects';
import { loadProfile, initProfile } from './profileSlice';
import { showApiError, hideApiError, API_ERROR_DURATION } from '../global/globalSlice';
import api from '../../api';

function* onLoadProfile() {
  yield takeLatest(loadProfile, function* ({ payload }) {
    const result = yield call(api.getProfile);
    if (result.error) {
      yield put(showApiError(result.error));
      yield delay(API_ERROR_DURATION);
      yield put(hideApiError());
    } else {
      // TODO: Is user in session?
      yield put(initProfile(result.details));
      // TODO: Is not in session?
    }
  });
}

export default function* () {
  yield all([
    fork(onLoadProfile)
  ])
};