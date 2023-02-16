/** @format */

import actions from '@redux/actions';
import { reducerDefault } from '@redux/common/reducers';
import { useSelector } from 'react-redux';

const initialState = {
  data: null,
  isLoading: false,
};

export const getProvince = (...props) => {
  return reducerDefault(...props, actions.GET_PROVINCE_LOCATION);
};

export const getDistrict = (...props) => {
  return reducerDefault(...props, actions.GET_DISTRICT_LOCATION);
};

export const getWard = (...props) => {
  return reducerDefault(...props, actions.GET_WARD_LOCATION);
};

export const getSaveLocation = (...props) => {
  return reducerDefault(...props, actions.GET_SAVE_LOCATION);
};
export const getSaveLocationDefault = (...props) => {
  return reducerDefault(...props, actions.GET_SAVE_LOCATION_DEFAULT);
};

export const saveAddress = (state = initialState, action) => {
  switch (action.type) {
    case actions.SAVE_ADDRESS:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

export const updateSaveLocation = (...props) => {
  return reducerDefault(...props, actions.UPDATE_SAVE_LOCATION);
};

export const deleteSaveLocation = (...props) => {
  return reducerDefault(...props, actions.DELETE_SAVE_LOCATION);
};

export const addSaveLocation = (...props) => {
  return reducerDefault(...props, actions.ADD_SAVE_LOCATION);
};

export const getSaveLocationType = (...props) => {
  return reducerDefault(...props, actions.GET_SAVE_LOCATION_TYPE);
};
