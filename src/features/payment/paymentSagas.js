import { all, takeLatest, put, call, fork, delay } from 'redux-saga/effects';
import { navigate } from 'gatsby';
import { pay, reserve, success, failed } from './paymentSlice';
import { showApiError } from '../global/globalSlice';
import api from '../../api';
// import { logout } from '../../helpers/authentication';

function* onPay() {
  yield takeLatest(pay, function* ({ payload }) {
    // TODO: Implement
    // const result = yield call(api.pay);
    // if (result.error) {
    //   if (result.status === 403) {
    //     yield logout();
    //     yield navigate('/login');
    //   } else {
    //     yield put(showApiError(result.error));
    //   }
    // } else {
    //   yield put(initProfile(result));
    // }
    yield delay(5000);
    yield put(success());
    yield navigate('/profile/payment_confirmed/someid');
  });
}

function* onReserve() {
  yield takeLatest(reserve, function* ({ payload }) {
    const result = yield call(api.reserve, payload);
    if (result.error) {
      yield put(showApiError(result.error));
      yield put(failed());
    } else {
      yield put(success());
      yield navigate('/profile/payment_confirmed/someid');
    }
  });
}

export default function* () {
  yield all([
    fork(onPay),
    fork(onReserve)
  ])
};