import { all, takeLatest, put, call, fork } from 'redux-saga/effects';
import { navigate } from 'gatsby';
import {
  loadProfile, initProfile, loadSessions,
  initSessions, sessionsLoaded, loadSessionDetail,
  initSessionDetail, performSessionAction, saveProfile,
  profileUpdated, saveProfileError
} from './profileSlice';
import { logout } from '../loginSignUp/loginSignUpSlice';
import { showApiError, updateCountries } from '../global/globalSlice';
import api from '../../api';
import { login } from '../../helpers/authentication';

function* onLoadProfile() {
  yield takeLatest(loadProfile, function* ({ payload }) {
    const result = yield call(api.getProfile);
    if (result.error) {
      if (result.status === 403) {
        yield put(logout());
      } else {
        yield put(showApiError(result.error));
      }
    } else {
      const countriesResult = yield call(api.getCountries);
      if (!countriesResult.error) {
        yield put(updateCountries(countriesResult));
      }
      yield login();
      yield put(initProfile(result));
    }
  });
}

function* onLoadSessions() {
  yield takeLatest(loadSessions, function* ({ payload = {} }) {
    const result = yield call(api.getSessions, payload);
    if (result.error) {
      if (result.status === 403) {
        yield put(logout());
      } else {
        yield put(showApiError(result.error));
      }
    } else {
      yield put(initSessions(result));
      yield put(sessionsLoaded());
    }
  });
}

function* onLoadSessionDetail() {
  yield takeLatest(loadSessionDetail, function* ({ payload }) {
    const result = yield call(api.getSessionDetail, payload);
    if (result.error) {
      if (result.status === 403) {
        yield put(logout());
      } else {
        yield put(showApiError(result.error));
      }
    } else {
      yield put(initSessionDetail(result));
      yield put(sessionsLoaded());
    }
  });
}

function* onPerformSessionAction() {
  yield takeLatest(performSessionAction, function* ({ payload }) {
    const result = yield call(api.performSessionAction, payload);
    if (result.error) {
      if (result.status === 403) {
        yield put(logout());
      } else {
        yield put(showApiError(result.error));
      }
    } else {
      // TODO: Handle response based on the action performed and result
      const { action } = payload;
      if (action === 'review_session') {
        yield put(loadSessionDetail(payload.id));
        yield navigate(`/profile/bookings/${payload.id}/review_session_success`);
      } else {
        yield navigate(`/profile/bookings/${payload.id}/success`);
      }
    }
  });
}

function* onSaveProfile() {
  yield takeLatest(saveProfile, function* ({ payload }) {
    const result = yield call(api.saveProfile, payload);
    if (result.error) {
      if (result.status === 403) {
        yield put(logout());
      } else if (result.error.code === 'invalid_user_data') {
        yield put(saveProfileError(result.error.details));
      }
    } else {
      // Handle response
      yield put(profileUpdated(result));
    }
  });
}

export default function* () {
  yield all([
    fork(onLoadProfile),
    fork(onLoadSessions),
    fork(onLoadSessionDetail),
    fork(onPerformSessionAction),
    fork(onSaveProfile)
  ])
};