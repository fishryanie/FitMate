import {put, takeLatest, select} from 'redux-saga/effects';
import actions, {_onFail, _onSuccess} from '@redux/actions';
import api from '@utils/api';
import {URL_API} from '../common';
import queryString from 'query-string';

function* getProvince(action) {
  try {
    const res = yield api.get(URL_API.address.getLocation, action.params);
    yield put({
      type: _onSuccess(action.type),
      data: res.data?.map((item, index) => ({
        value: item.code,
        label: item.title,
      })),
    });
    action.onSuccess?.(res.data);
  } catch (error) {
    action.onFail?.();
    yield put({type: _onFail(action.type)});
  }
}

function* getDistrict(action) {
  try {
    const res = yield api.get(URL_API.address.getLocation, action.params);
    yield put({
      type: _onSuccess(action.type),
      data: res.data?.map((item, index) => ({
        value: item.code,
        label: item.title,
      })),
    });
    action.onSuccess?.(res.data);
  } catch (error) {
    action.onFail?.();
    yield put({type: _onFail(action.type)});
  }
}

function* getWard(action) {
  try {
    const res = yield api.get(URL_API.address.getLocation, action.params);
    yield put({
      type: _onSuccess(action.type),
      data: res.data?.map((item, index) => ({
        value: item.code,
        label: item.title,
      })),
    });
    action.onSuccess?.(res.data);
  } catch (error) {
    action.onFail?.();
    yield put({type: _onFail(action.type)});
  }
}

function* getSaveLocation(action) {
  const userToken = yield select(state => state.user.userToken);
  try {
    const res = yield api.get(URL_API.address.getSavedLocation, {
      user: userToken,
    });
    yield put({
      type: _onSuccess(action.type),
      data: res.data,
    });
    action.onSuccess?.(res?.data);
  } catch (error) {
    action.onFail?.();
    yield put({type: _onFail(action.type)});
  }
}

function* getSaveLocationDefault(action) {
  const userToken = yield select(state => state.user.userToken);
  try {
    const res = yield api.get(URL_API.address.getSavedLocation, {
      user: userToken,
      is_default: '1',
      ...(action.params || {}),
    });
    yield put({
      type: _onSuccess(action.type),
      data: res.data,
    });
    action.onSuccess?.(res?.data);
  } catch (error) {
    action.onFail?.();
    yield put({type: _onFail(action.type)});
  }
}

function* updateSaveLocation(action) {
  const userToken = yield select(state => state.user.userToken);
  const body = queryString.stringify(action.body);
  try {
    const res = yield api.post(URL_API.address.updateSavedLocation, body, {
      user: userToken,
    });
    yield put({
      type: _onSuccess(action.type),
      data: res.data,
    });
    action.onSuccess?.(res.data);
  } catch (error) {
    action.onFail?.();
    yield put({type: _onFail(action.type)});
  }
}

function* deleteSaveLocation(action) {
  const userToken = yield select(state => state.user.userToken);
  const body = queryString.stringify(action.body);
  try {
    const res = yield api.post(URL_API.address.deleteSavedLocation, body, {
      user: userToken,
    });
    yield put({
      type: _onSuccess(action.type),
      data: res.data,
    });
    action.onSuccess?.(res.data);
  } catch (error) {
    action.onFail?.();
    yield put({type: _onFail(action.type)});
  }
}

function* addSaveLocation(action) {
  const userToken = yield select(state => state.user.userToken);
  const body = queryString.stringify(action.body);
  try {
    const res = yield api.post(URL_API.address.addSavedLocation, body, {
      user: userToken,
    });
    yield put({
      type: _onSuccess(action.type),
      data: res.data,
    });
    action.onSuccess?.(res.data);
  } catch (error) {
    action.onFail?.();
    yield put({type: _onFail(action.type)});
  }
}

function* getSaveLocationType(action) {
  try {
    const res = yield api.get(URL_API.address.getSavedLocationType);
    yield put({
      type: _onSuccess(action.type),
      data: res.data?.map((item, index) => ({
        value: item.item_id,
        label: item.title,
        picture: item.picture,
        thumbnail: item.item,
      })),
      // data: res.data,
    });
    action.onSuccess?.(res?.data);
  } catch (error) {
    action.onFail?.();
    yield put({type: _onFail(action.type)});
  }
}

export function* watchAddressSagas() {
  // yield takeLatest(actions.GET_PROVINCE_LOCATION, getProvince);
  // yield takeLatest(actions.GET_DISTRICT_LOCATION, getDistrict);
  // yield takeLatest(actions.GET_WARD_LOCATION, getWard);
  // yield takeLatest(actions.GET_SAVE_LOCATION, getSaveLocation);
  // yield takeLatest(actions.GET_SAVE_LOCATION_DEFAULT, getSaveLocationDefault);
  // yield takeLatest(actions.UPDATE_SAVE_LOCATION, updateSaveLocation);
  // yield takeLatest(actions.DELETE_SAVE_LOCATION, deleteSaveLocation);
  // yield takeLatest(actions.ADD_SAVE_LOCATION, addSaveLocation);
  // yield takeLatest(actions.GET_SAVE_LOCATION_TYPE, getSaveLocationType);
}
