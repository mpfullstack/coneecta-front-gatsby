import { all, takeLatest, put, call, fork, delay } from 'redux-saga/effects';
import { navigate } from 'gatsby';
import { loadProfile, initProfile } from './profileSlice';
import { showApiError, hideApiError, API_ERROR_DURATION } from '../global/globalSlice';
import api from '../../api';

function* onLoadProfile() {
  yield takeLatest(loadProfile, function* ({ payload }) {
    const result = yield call(api.getProfile);
    debugger;
    if (result.error) {
      if (result.status === 403) {
        yield navigate('/login');
      } else {
        yield put(showApiError(result.error));
        yield delay(API_ERROR_DURATION);
        yield put(hideApiError());
      }
    } else {
      yield put(initProfile(result));
    }
  });
}

export default function* () {
  yield all([
    fork(onLoadProfile)
  ])
};