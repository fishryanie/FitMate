/** @format */

import { combineReducers } from 'redux';

import * as userReducers from './combineReducers/userReducers';
import * as otherReducers from './combineReducers/otherReducers';
import * as addressReducers from './combineReducers/addressReducers';
import * as generalReducers from './combineReducers/generalReducers';

const rootReducer = combineReducers({
  ...userReducers,
  ...otherReducers,
  ...generalReducers,
  ...addressReducers,
});

export default rootReducer;
