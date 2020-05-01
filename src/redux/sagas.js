import { all } from 'redux-saga/effects';
import professionalProfileSagas from '../features/professionalProfile/professionalProfileSagas';

export default function* rootSaga(getState) {
  yield all([
    professionalProfileSagas()
  ]);
}