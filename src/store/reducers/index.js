/** @format */

import { combineReducers } from 'redux';

import * as userReducers from './combineReducers/userReducers';
import * as otherReducers from './combineReducers/appReducers';
import * as locationReducers from './combineReducers/locationReducers';
import * as generalReducers from './combineReducers/generalReducers';

const rootReducer = combineReducers({
  ...userReducers,
  ...otherReducers,
  ...generalReducers,
  ...locationReducers,
});

export default rootReducer;
