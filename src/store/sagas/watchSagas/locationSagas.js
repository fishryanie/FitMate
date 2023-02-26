/** @format */

import { put, takeLatest, select, call, delay } from '@redux-saga/core/effects';
import actions, { _onFail, _onSuccess } from 'store/actions';
import api from '@utils/api';
import { URL_API } from '../common';
import queryString from 'query-string';
import axios from 'axios';

const GOONG_MAP_API_KEY = 'FY6m4IfF0iVoEGMkJ9VwvrxDOk1eqM17JYS3Ul8y';
const instance = axios.create({
  baseURL: 'https://rsapi.goong.io/',
  timeout: 1000,
});

instance.interceptors.request.use(
  config => {
    config.params = {
      api_key: GOONG_MAP_API_KEY,
      ...config.params,
    };
    if (__DEV__) {
      console.log(
        `%c [REQUEST] ${config?.url}`,
        'color: #458B00; font-weight: bold',
        config,
      );
    }
    return config;
  },
  error => {
    throw error;
  },
);

instance.interceptors.response.use(
  response => {
    if (__DEV__) {
      console.log(
        `%c [RESPONSE] ${response.config.url}`,
        'color: #CD950C; font-weight: bold',
        response,
      );
    }
    return response;
  },
  error => {
    if (__DEV__) {
      console.log('ERROR: ', error.response);
    }
    throw error;
  },
);

function* gmGeocoding(action) {
  try {
    if (action.delay) {
      yield delay(action.delay);
    }
    const res = yield call(instance.get, 'geocode', {
      params: action.params,
    });

    const { status, error_message } = res.data;
    if (status === 'OK' || status === 'ZERO_RESULTS') {
      yield put({
        type: _onSuccess(action.type),
        data: res.data.results[0],
      });
      action.onSuccess?.(res.data.results[0]);
    } else {
      throw new Error(error_message);
    }
  } catch (error) {
    yield put({ type: _onFail(action.type) });
  }
}

function* gmDirections(payload) {
  const directions = 'direction';
  const params = {
    alternatives: false,
    vehicle: 'bike',
    ...(payload.params || {}),
  };
  try {
    const res = yield call(instance.get, directions, {
      params,
    });
    if (res.status === 200) {
      yield put({ type: _onSuccess(payload.type), data: res.data });
      payload.onSuccess && payload.onSuccess(res.data);
    } else {
      throw new Error('invalid response');
    }
  } catch (error) {
    yield put({ type: _onFail(payload.type) });
  }
}

function* gmAutoComplete(payload) {
  try {
    yield delay(500);
    const res = yield call(instance.get, '/place/autocomplete', {
      params: payload.params,
    });
    const { status, error_message } = res.data;
    const isLoading = yield select(state => state.placeAutoComplete.isLoading);
    if ((status === 'OK' || status === 'ZERO_RESULTS') && isLoading) {
      const data = res.data.predictions || [];
      if (data.length) {
        const userLocation = yield select(state => state.userLocation.data);
        const allPromise = data.map(async d => {
          const detail = await instance.get('place/detail', {
            params: { place_id: d.place_id },
          });
          const direction = await instance.get('direction', {
            params: {
              alternatives: false,
              vehicle: 'bike',
              origin: `${userLocation.latitude},${userLocation.longitude}`,
              destination: `${detail.data.result.geometry.location.lat},${detail.data.result.geometry.location.lng}`,
            },
          });
          return { detail, direction };
        });
        const result = yield Promise.all(allPromise);
        data.forEach((d, i) => {
          const geometry = result[i].detail.data.result.geometry;
          d.geometry = geometry;
          d.distanceToUser =
            (result[i].direction.data.routes[0].legs[0].distance.value || 0) / 1000;
        });
        data.sort((a, b) => a.distanceToUser - b.distanceToUser);
      }
      yield put({ type: _onSuccess(payload.type), data });
    } else {
      throw new Error(error_message);
    }
  } catch (error) {
    yield put({ type: _onFail(payload.type) });
  }
}

function* getCountry(action) {
  try {
    const res = yield api.get(URL_API.address.getLocation, { type: 'country' });
    yield put({
      type: _onSuccess(action.type),
      data: res.data?.map(item => ({
        value: item.code,
        label: item.title,
      })),
    });
    action.onSuccess?.(res.data);
  } catch (error) {
    action.onFail?.();
    yield put({ type: _onFail(action.type) });
  }
}

function* getProvince(action) {
  try {
    const res = yield api.get(URL_API.address.getLocation, { type: 'province' });
    yield put({
      type: _onSuccess(action.type),
      data: res.data?.map(item => ({
        value: item.code,
        label: item.title,
      })),
    });
    action.onSuccess?.(res.data);
  } catch (error) {
    action.onFail?.();
    yield put({ type: _onFail(action.type) });
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
    yield put({ type: _onFail(action.type) });
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
    yield put({ type: _onFail(action.type) });
  }
}

function* getSavedLocationType(action) {
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
    yield put({ type: _onFail(action.type) });
  }
}

function* getSavedLocation(action) {
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
    yield put({ type: _onFail(action.type) });
  }
}

function* addSavedLocation(action) {
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
    action.onFail?.(error);
    yield put({ type: _onFail(action.type) });
  }
}

function* updateSavedLocation(action) {
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
    yield put({ type: _onFail(action.type) });
  }
}

function* deleteSavedLocation(action) {
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
    yield put({ type: _onFail(action.type) });
  }
}

export function* watchLocationSagas() {
  yield takeLatest(actions.GM_GEOCODING, gmGeocoding);
  yield takeLatest(actions.GM_DIRECTIONS, gmDirections);
  yield takeLatest(actions.GM_AUTOCOMPLETE, gmAutoComplete);
  // //server
  yield takeLatest(actions.GET_COUNTRY, getCountry);
  yield takeLatest(actions.GET_PROVINCE, getProvince);
  yield takeLatest(actions.GET_DISTRICT, getDistrict);
  yield takeLatest(actions.GET_WARD, getWard);
  yield takeLatest(actions.GET_SAVED_LOCATION_TYPE, getSavedLocationType);
  yield takeLatest(actions.GET_SAVED_LOCATION, getSavedLocation);
  yield takeLatest(actions.ADD_SAVED_LOCATION, addSavedLocation);
  yield takeLatest(actions.UPDATE_SAVED_LOCATION, updateSavedLocation);
  yield takeLatest(actions.DELETE_SAVED_LOCATION, deleteSavedLocation);
}
