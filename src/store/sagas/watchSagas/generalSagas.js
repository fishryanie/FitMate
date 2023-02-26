/** @format */

import api from '@utils/api';
import actions, { _onFail, _onSuccess } from 'store/actions';
import { put, takeLatest } from 'redux-saga/effects';
import { URL_API } from '../common';

function* getConfigsApp(action) {
  try {
    const res = yield api.get(URL_API.getConfigsApp, action.params);
    yield put({
      type: _onSuccess(action.type),
      data: res.data,
    });
    action.onSuccess?.(res.data);
  } catch (error) {
    yield put({ type: _onFail(action.type) });
    action.onFail?.(error.data);
  }
}

export function* watchGeneralSagas() {
  yield takeLatest(actions.GET_CONFIGS_APP, getConfigsApp);
}
