import { all, takeLatest, put, call, fork } from 'redux-saga/effects';
import { loadProfile, initProfile } from './profileSlice';

const api = {
  fetchProfile: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({
        details: { name: 'Juan'},
        services: [{
          id: 1,
          name: 'Service I'
        }, {
          id: 2,
          name: 'Service II'
        }]
      }), 500);
    })
  }
};

function* onLoadProfile() {
  yield takeLatest(loadProfile, function* () {
    const profile = yield call(api.fetchProfile);
    yield put(initProfile(profile));
  });
}

export { api };

export default function* () {
  yield all([
    fork(onLoadProfile)
  ])
};