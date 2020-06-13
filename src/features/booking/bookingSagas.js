import { all, takeLatest, put, call, fork, delay, select } from 'redux-saga/effects';
import {
  initAvailableDates,
  initAvailableTimeZones,
  selectTimeZone,
  selectDate,
  selectTime,
  fetchAvailableTimeZones
} from './bookingSlice';
import { getFirstAvailableTime, isTimeAvailable } from '../../helpers/data';
import { showApiError, hideApiError } from '../global/globalSlice';
import api from '../../api';

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

function* onSelectDate() {
  // We have the selected date on payload
  yield takeLatest(selectDate, function* ({ payload }) {
    const { booking } = yield select();
    if (!booking.time) {
      const time = getFirstAvailableTime(booking.availableDates, booking.date);
      yield put(selectTime({ value: time, available: time ? true : false }));
    } else {
      const available = isTimeAvailable(booking.availableDates, booking.date, booking.time);
      yield put(selectTime({ value: booking.time, available }));
    }
  });
}

export default function* () {
  yield all([
    fork(onSelectTimeZone),
    fork(onFetchAvailableTimeZones),
    fork(onSelectDate)
  ])
};