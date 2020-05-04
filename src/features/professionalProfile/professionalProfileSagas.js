import { all, takeLatest, put, call, fork, delay } from 'redux-saga/effects';
import { loadProfile, initProfile } from './professionalProfileSlice';
import { showApiError, hideApiError } from '../global/globalSlice';
import api from '../../api';

function* onLoadProfile() {
  // We receive the professional id in payload
  yield takeLatest(loadProfile, function* ({ payload }) {
    const result = yield call(api.getProfessionalProfile, payload);
    if (result.error) {
      yield put(showApiError(result.error));
      yield delay(5000);
      yield put(hideApiError());
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