/** @format */

import { put, select, takeLatest } from 'redux-saga/effects';
import actions, { _onFail, _onSuccess, _onUnmount } from 'store/actions';
import { handleFormData } from '@utils/helper';
import api from '@utils/api';
import { URL_API } from '../common';
import queryString from 'query-string';
import Toast from 'react-native-toast-message';

function* login(action) {
  try {
    const res = yield api.post(URL_API.user.login, action.body);
    yield put({
      type: actions.SAVE_USER_INFO,
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    });
    yield put({
      type: _onSuccess(action.type),
      data: res.data,
    });
    action.onSuccess?.(res);
    Toast.show({
      type: 'success',
      text1: res?.message,
    });
  } catch (error) {
    yield put({ type: _onFail(action.type) });
    action.onFail?.(error.data);
    Toast.show({
      type: 'error',
      text1: 'Access Denied!',
      text2: error?.data?.message,
    });
  }
}

function* signUpUser(action) {
  const body = yield handleFormData(action.body);
  try {
    const res = yield api.postFormData(URL_API.user.signUpUser, body);
    yield put({
      type: _onSuccess(action.type),
      data: res,
    });
    action.onSuccess?.(res);
  } catch (error) {
    action.onFail?.(error);
    yield put({ type: _onFail(action.type) });
  }
}

function* checkPhone(action) {
  try {
    const res = yield api.get(URL_API.user.checkPhone, action.params);
    yield put({
      type: _onSuccess(action.type),
      data: res,
    });
    action.onSuccess?.(res.data);
  } catch (error) {
    action.onFail?.(error.data);
    yield put({ type: _onFail(action.type) });
  }
}

function* getOneUser(action) {
  try {
    const res = yield api.get(URL_API.user.getUser);
    yield put({
      type: _onSuccess(action.type),
      data: res.data,
    });
    action.onSuccess?.(res?.data);
  } catch (error) {
    action.onFail?.(error.data.message);
    yield put({ type: _onFail(action.type) });
  }
}

function* updateAvatar(action) {
  const body = yield handleFormData(action.body);
  const userToken = yield select(state => state.user.userToken);

  try {
    const res = yield api.postFormData(URL_API.user.updateAvatar, body, {
      user: userToken,
    });
    yield put({
      type: _onSuccess(action.type),
      data: res.data,
    });
    action.onSuccess?.(res.message);
  } catch (error) {
    action.onFail?.(error.data);
    yield put({ type: _onFail(action.type) });
  }
}

function* updateOneUser(action) {
  // const body = yield handleFormData(action.body);
  try {
    const res = yield api.put(URL_API.user.updateUser, action.body);
    yield put({ type: actions.GET_ONE_USER });
    yield put({
      type: _onSuccess(action.type),
      data: res.data,
    });
    action.onSuccess?.(res.data);
    Toast.show({
      type: 'success',
      text1: res?.message,
    });
  } catch (error) {
    yield put({ type: _onFail(action.type) });
    action.onFail?.(error.data);
    Toast.show({
      type: 'error',
      text1: 'Access Denied!',
      text2: error?.data?.message,
    });
  }
}

function* sendOTP(action) {
  try {
    const res = yield api.get(URL_API.user.sendOTP, action.params);
    yield put({
      type: _onSuccess(action.type),
      data: res,
    });
    action.onSuccess?.(res.data);
  } catch (error) {
    action.onFail?.(error.data);
    yield put({ type: _onFail(action.type) });
  }
}

function* updatePass(action) {
  const userToken = yield select(state => state.user.userToken);
  const body = queryString.stringify(action.body);
  try {
    const res = yield api.post(URL_API.user.updatePassword, body, {
      user: userToken,
      ...(action.params || {}),
    });
    yield put({
      type: _onSuccess(action.type),
      data: res.data,
    });
    action.onSuccess?.(res.data);
  } catch (error) {
    action.onFail?.(error?.data?.message);
    yield put({ type: _onFail(action.type) });
  }
}

export function* watchUserSagas() {
  yield takeLatest(actions.LOGIN_APP, login);
  yield takeLatest(actions.GET_ONE_USER, getOneUser);
  // yield takeLatest(actions.UPDATE_AVATAR, updateAvatar);
  yield takeLatest(actions.UPDATE_ONE_USER, updateOneUser);
  // yield takeLatest(actions.UPDATE_PASS, updatePass);
  // yield takeLatest(actions.CHECK_PHONE, checkPhone);
  // yield takeLatest(actions.SEND_OTP, sendOTP);
  // yield takeLatest(actions.SIGN_UP_USER, signUpUser);
}
