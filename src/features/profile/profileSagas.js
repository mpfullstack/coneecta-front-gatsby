import { all, takeLatest, put, call, fork } from 'redux-saga/effects';
import {
  loadProfile, initProfile, loadSessions,
  initSessions, sessionsLoaded, loadSessionDetail,
  initSessionDetail, performSessionAction
} from './profileSlice';
import { showApiError } from '../global/globalSlice';
import api from '../../api';
import { login, logout } from '../../helpers/authentication';

function* onLoadProfile() {
  yield takeLatest(loadProfile, function* ({ payload }) {
    const result = yield call(api.getProfile);
    if (result.error) {
      if (result.status === 403) {
        yield logout();
      } else {
        yield put(showApiError(result.error));
      }
    } else {
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
        yield logout();
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
        yield logout();
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
        yield logout();
      } else {
        yield put(showApiError(result.error));
      }
    } else {
      // TODO: Handle response based on the action performed and result
    }
  });
}


export default function* () {
  yield all([
    fork(onLoadProfile),
    fork(onLoadSessions),
    fork(onLoadSessionDetail),
    fork(onPerformSessionAction)
  ])
};