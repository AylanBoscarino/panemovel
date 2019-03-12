import { combineReducers } from 'redux';

import geolocation from './ducks/geolocation';

export default combineReducers({
  geolocation,
});
