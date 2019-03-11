import { combineReducers } from 'redux';

import geolocation from './ducks/geolocation.android';

export default combineReducers({
  geolocation,
});
