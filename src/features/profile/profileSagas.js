import { all, takeLatest, put, call, fork } from 'redux-saga/effects';
import { navigate } from 'gatsby';
import { loadProfile, initProfile } from './profileSlice';
import { showApiError } from '../global/globalSlice';
import api from '../../api';
import { login, logout } from '../../helpers/authentication';

function* onLoadProfile() {
  yield takeLatest(loadProfile, function* ({ payload }) {
    const result = yield call(api.getProfile);
    if (result.error) {
      if (result.status === 403) {
        yield logout();
        // yield navigate('/login');
      } else {
        yield put(showApiError(result.error));
      }
    } else {
      yield login();
      yield put(initProfile(result));
    }
  });
}

export default function* () {
  yield all([
    fork(onLoadProfile)
  ])
};