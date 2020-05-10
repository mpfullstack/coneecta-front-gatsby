import { all, takeLatest, put, fork, select } from 'redux-saga/effects';
import { handleHeaderClick } from './globalSlice';
import { changeSection, collapseProfileHeader } from '../professionalProfile/professionalProfileSlice';
import api from '../../api';

function* onClickHeader() {
  yield takeLatest(handleHeaderClick, function* () {
    const state = yield select();
    if (state.professionalProfile.section === 'datePicker') {
      yield put(changeSection('serviceList'));
      yield put(collapseProfileHeader(false));
    }
  });
}

export default function* () {
  yield all([
    fork(onClickHeader)
  ])
};