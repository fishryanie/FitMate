/** @format */

import actions from 'store/actions';
import { reducerDefault } from 'store/common/reducers';

//gg map goong.io
export const gmGeocoding = (...props) => {
  return reducerDefault(...props, actions.GM_GEOCODING);
};

export const gmDirections = (...props) => {
  return reducerDefault(...props, actions.GM_DIRECTIONS);
};

export const gmAutoComplete = (...props) => {
  return reducerDefault(...props, actions.GM_AUTOCOMPLETE);
};

// server
export const getProvince = (...props) => {
  return reducerDefault(...props, actions.GET_PROVINCE);
};

export const getDistrict = (...props) => {
  return reducerDefault(...props, actions.GET_DISTRICT);
};

export const getWard = (...props) => {
  return reducerDefault(...props, actions.GET_WARD);
};

export const getSavedLocation = (...props) => {
  return reducerDefault(...props, actions.GET_SAVED_LOCATION);
};

export const getSavedLocationType = (...props) => {
  return reducerDefault(...props, actions.GET_SAVED_LOCATION_TYPE);
};

export const addSavedLocation = (...props) => {
  return reducerDefault(...props, actions.ADD_SAVED_LOCATION);
};

export const updateSavedLocation = (...props) => {
  return reducerDefault(...props, actions.UPDATE_SAVED_LOCATION);
};

export const deleteSavedLocation = (...props) => {
  return reducerDefault(...props, actions.DELETE_SAVED_LOCATION);
};
