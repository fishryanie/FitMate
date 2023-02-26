/** @format */

import actions from 'store/actions';
import { reducerDefault } from 'store/common/reducers';

export const getConfigsApp = (...props) => {
  return reducerDefault(...props, actions.GET_CONFIGS_APP);
};
