/** @format */

export const _onSuccess = action => action + '_SUCCESS';
export const _onFail = action => action + '_FAIL';
export const _onUnmount = action => action + '_UNMOUNT';

export default {
  // app
  GET_CONFIGS_APP: 'GET_CONFIGS_APP',
  TOGGLE_DRAWER: 'TOGGLE_DRAWER',
  //auth
  LOGIN_APP: 'LOGIN_APP',
  LOGOUT_APP: 'LOGOUT_APP',
  SAVE_USER_INFO: 'SAVE_USER_INFO',
  GET_ONE_USER: 'GET_ONE_USER',
  UPDATE_ONE_USER: 'UPDATE_ONE_USER',
  DELETE_ONE_USER: 'DELETE_ONE_USER',
  // categorise
  GET_CATEGORIES: 'GET_CATEGORIES',
  // product
  GET_PRODUCT: 'GET_PRODUCT',
};
