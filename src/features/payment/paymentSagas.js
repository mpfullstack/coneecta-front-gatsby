import { all, takeLatest, put, call, fork } from 'redux-saga/effects';
import { navigate } from 'gatsby';
import { checkout, reserve, success, failed, updatePaymentCheckoutDetails } from './paymentSlice';
import { showApiError } from '../global/globalSlice';
import api from '../../api';
// import { logout } from '../../helpers/authentication';

function* onCheckout() {
  yield takeLatest(checkout, function* ({ payload }) {
    const result = yield call(api.checkout, payload);
    if (result.error) {
      yield put(showApiError(result.error));
      yield put(failed());
    } else {
      yield put(updatePaymentCheckoutDetails(result));
      yield navigate('/profile/payment_checkout');
    }
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
      yield navigate('/profile/payment_ok/someid');
    }
  });
}

export default function* () {
  yield all([
    fork(onCheckout),
    fork(onReserve)
  ])
};