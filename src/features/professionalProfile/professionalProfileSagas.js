import { all, takeLatest, put, call, fork } from 'redux-saga/effects';
import { loadProfile, initProfile } from './professionalProfileSlice';
import api from '../../api';

function* onLoadProfile() {
  // We receive the professional id in payload
  yield takeLatest(loadProfile, function* ({ payload }) {
    const profile = yield call(api.getProfessionalProfile, payload);
    yield put(initProfile(profile));
  });
}

export default function* () {
  yield all([
    fork(onLoadProfile)
  ])
};