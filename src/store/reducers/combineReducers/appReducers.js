/** @format */

import { APP_LANGUAGE } from '@constants';
import actions from 'store/actions';

const initialState = {
  data: null,
  isDrawer: false,
  isLoading: false,
  fcmMessage: null,
  isFirstOpenApp: true,
  isActiveBiometrics: false,
  lang: APP_LANGUAGE.vietnamese,
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case actions.SAVE_FIRST_OPEN_APP:
      return { ...state, isFirstOpenApp: false };
    case actions.SAVE_FCM_MESSAGE:
      return { ...state, fcmMessage: action.data };
    case actions.CHANGE_LANGUAGE:
      return { ...state, lang: action.value };
    case actions.SAVE_CALL_RESULT:
      return { ...state, callResult: action.data };
    case actions.ACTIVE_BIOMETRICS:
      return { ...state, isActiveBiometrics: action.isActive };
    case actions.TOGGLE_DRAWER:
      state.isDrawer = !state.isDrawer;
      return { ...state };
    default:
      return state;
  }
};
