import { all, takeLatest, put, call, fork, delay } from 'redux-saga/effects';
import { selectService } from './bookingSlice';
import { showApiError, hideApiError } from '../global/globalSlice';
import api from '../../api';

// TODO: Implement call to API
function* onSelectService() {
  // We have serviceId and modalityType in payload
  yield takeLatest(selectService, function* ({ payload }) {
    const result = yield call(api.getAvailableDates, payload);
    if (result.error) {
      yield put(showApiError(result.error));
      yield delay(5000);
      yield put(hideApiError());
    } else {
      yield put(initAvialableDates(result));
    }
  });
}

export default function* () {
  yield all([
    fork(onSelectService)
  ])
};