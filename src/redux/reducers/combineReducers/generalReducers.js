/** @format */

import actions from '@redux/actions';
import { reducerDefault } from '@redux/common/reducers';

export const getConfigsApp = (...props) => {
  return reducerDefault(...props, actions.GET_CONFIGS_APP);
};
