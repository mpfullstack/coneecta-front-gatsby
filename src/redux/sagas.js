import { all } from 'redux-saga/effects';
import globalSagas from '../features/global/globalSagas';
import professionalProfileSagas from '../features/professionalProfile/professionalProfileSagas';
import bookingSagas from '../features/booking/bookingSagas';
import loginSingUpSagas from '../features/loginSignUp/loginSignUpSagas';

export default function* rootSaga() {
  yield all([
    globalSagas(),
    professionalProfileSagas(),
    bookingSagas(),
    loginSingUpSagas()
  ]);
}