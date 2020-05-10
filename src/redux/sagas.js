import { all } from 'redux-saga/effects';
import globalSagas from '../features/global/globalSagas';
import professionalProfileSagas from '../features/professionalProfile/professionalProfileSagas';

export default function* rootSaga() {
  yield all([
    globalSagas(),
    professionalProfileSagas()
  ]);
}