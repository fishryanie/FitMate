/** @format */

export const _onSuccess = action => action + '_SUCCESS';
export const _onFail = action => action + '_FAIL';
export const _onUnmount = action => action + '_UNMOUNT';

export default {
  // app
  TOGGLE_DRAWER: 'TOGGLE_DRAWER',
  GET_CONFIGS_APP: 'GET_CONFIGS_APP',
  CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
  ACTIVE_BIOMETRICS: 'ACTIVE_BIOMETRICS',
  SAVE_FIRST_OPEN_APP: 'SAVE_FIRST_OPEN_APP',
  SAVE_FCM_MESSAGE: 'SAVE_FCM_MESSAGE',
  SAVE_CALL_RESULT: 'SAVE_CALL_RESULT',
  SAVE_INVITE_CODE: 'SAVE_INVITE_CODE',

  //user
  SAVE_USER_INFO: 'SAVE_USER_INFO',
  SAVE_USER_LOGIN: 'SAVE_USER_LOGIN',
  GET_USER: 'GET_USER',
  UPDATE_ONE_USER: 'UPDATE_ONE_USER',
  DELETE_ONE_USER: 'DELETE_ONE_USER',
  CHANGE_PASS: 'CHANGE_PASS',
  LOGIN_APP: 'LOGIN_APP',
  LOGOUT_APP: 'LOGOUT_APP',
  // categorise
  GET_CATEGORIES: 'GET_CATEGORIES',
  // product
  GET_PRODUCT: 'GET_PRODUCT',

  // LOCATION
  GM_GEOCODING: 'GM_GEOCODING',
  GM_DIRECTIONS: 'GM_DIRECTIONS',
  GM_AUTOCOMPLETE: 'GM_AUTOCOMPLETE',
  GET_COUNTRY: 'GET_COUNTRY',
  GET_PROVINCE: 'GET_PROVINCE',
  GET_DISTRICT: 'GET_DISTRICT',
  GET_WARD: 'GET_WARD',
  GET_SAVED_LOCATION: 'GET_SAVED_LOCATION',
  GET_SAVED_LOCATION_TYPE: 'GET_SAVED_LOCATION_TYPE',
  ADD_SAVED_LOCATION: 'ADD_SAVED_LOCATION',
  UPDATE_SAVED_LOCATION: 'UPDATE_SAVED_LOCATION',
  DELETE_SAVED_LOCATION: 'DELETE_SAVED_LOCATION',

  // general
  GET_ORDER_METHOD: 'GET_ORDER_METHOD',
};
