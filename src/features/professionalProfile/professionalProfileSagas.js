import { all, takeLatest, put, call, fork } from 'redux-saga/effects';
import { loadProfessionalProfile, initProfile, loadProfessionalProfileReviews, initProfileReviews, showService } from './professionalProfileSlice';
import { showApiError } from '../global/globalSlice';
import api from '../../api';

function* onLoadProfessionalProfile() {
  // We receive the professional id (id) an optionally service slug (sid) in payload
  yield takeLatest(loadProfessionalProfile, function* ({ payload }) {
    const result = yield call(api.getProfessionalProfile, payload.id);
    if (result.error) {
      yield put(showApiError(result.error.code));
    } else {
      if (payload.sid) {
        // sid is the service slug, we should find the corresponding service id for this
        // service slug in the profile
        result.services = result.services.filter(
          service => service.slug === payload.sid
        );
        if (result.services.length) {
          yield put(showService(result.services[0].id));
        }
      } else if (result.services.length === 1) {
        yield put(showService(Number(result.services[0].id)));
      }
      yield put(initProfile(result));
    }
  });
}

function* onLoadProfessionalProfileReviews() {
  yield takeLatest(loadProfessionalProfileReviews, function* ({ payload }) {
    const result = yield call(api.getProfessionalProfileReviews, payload);
    if (result.error) {
      yield put(showApiError(result.error.code));
    } else {
      yield put(initProfileReviews(result));
    }
  });
}

export default function* () {
  yield all([
    fork(onLoadProfessionalProfile),
    fork(onLoadProfessionalProfileReviews)
  ])
};