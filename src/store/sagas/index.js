/** @format */

import { all, fork } from 'redux-saga/effects';

import { watchUserSagas } from './watchSagas/userSagas';
import { watchLocationSagas } from './watchSagas/locationSagas';
import { watchGeneralSagas } from './watchSagas/generalSagas';

export default function* rootSaga() {
  yield all([fork(watchUserSagas), fork(watchLocationSagas), fork(watchGeneralSagas)]);
}
