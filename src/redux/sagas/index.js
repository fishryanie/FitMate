/** @format */

import { all, fork } from 'redux-saga/effects';

import { watchUserSagas } from './watchSagas/userSagas';
import { watchAddressSagas } from './watchSagas/addressSagas';
import { watchGeneralSagas } from './watchSagas/generalSagas';

export default function* rootSaga() {
  yield all([fork(watchUserSagas), fork(watchAddressSagas), fork(watchGeneralSagas)]);
}
