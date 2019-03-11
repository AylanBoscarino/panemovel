import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

const state = {};
const thunkMiddleware = applyMiddleware(thunk);

export default createStore(
  reducer,
  state,
  thunkMiddleware
);
