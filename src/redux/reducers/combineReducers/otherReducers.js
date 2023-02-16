/** @format */

import { APP_LANGUAGE } from '@constants';
import actions from '@redux/actions';

const initialState = {
  isDrawer: false,
  isFirstOpenApp: true,
  isActiveBiomatrics: false,
  lang: APP_LANGUAGE.vietnamese,
};

export const other = (state = initialState, action) => {
  switch (action.type) {
    case actions.SAVE_FIRST_OPEN_APP:
      return { ...state, isFirstOpenApp: false };
    case actions.SAVE_LANGUAGE:
      return { ...state, lang: action.data };
    case actions.TOGGLE_DRAWER:
      state.isDrawer = !state.isDrawer;
      return { ...state };
    default:
      return state;
  }
};
