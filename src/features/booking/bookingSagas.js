import { all, takeLatest, put, call, fork, delay, select } from 'redux-saga/effects';
import {
  selectService,
  initAvailableDates,
  selectDate,
  // initAvailableTimes,
  initAvailableTimeZones,
  selectTimeZone,
  fetchAvailableTimeZones
} from './bookingSlice';
import { showApiError, hideApiError } from '../global/globalSlice';
import api from '../../api';

// Implement call to API
// function* onSelectService() {
//   // We have serviceId and modalityType in payload
//   yield takeLatest(selectService, function* ({ payload }) {

//   });
// }

// function* onSelectDate() {
//   // We have selected date in payload
//   yield takeLatest(selectDate, function* ({ payload }) {
//     const result = yield call(api.getAvailableTimes, payload);
//     if (result.error) {
//       yield put(showApiError(result.error));
//       yield delay(5000);
//       yield put(hideApiError());
//     } else {
//       yield put(initAvailableTimes(result));
//     }
//   });
// }

function* onFetchAvailableTimeZones() {
  yield takeLatest(fetchAvailableTimeZones, function* () {
    const result = yield call(api.getAvailableTimezones);
    if (result.error) {
      yield put(showApiError(result.error));
      yield delay(5000);
      yield put(hideApiError());
    } else {
      yield put(initAvailableTimeZones(result));
    }
  });
}

function* onSelectTimeZone() {
  // We have selected timezone on payload
  yield takeLatest(selectTimeZone, function* ({ payload }) {
    const state = yield select();
    const result = yield call(api.getAvailableDates, {
      timezone: payload,
      serviceId: state.booking.serviceId
    });
    if (result.error) {
      yield put(showApiError(result.error));
      yield delay(5000);
      yield put(hideApiError());
    } else {
      yield put(initAvailableDates(result));
    }
  });
}

export default function* () {
  yield all([
    // fork(onSelectService),
    // fork(onSelectDate),
    fork(onSelectTimeZone),
    fork(onFetchAvailableTimeZones)
  ])
};