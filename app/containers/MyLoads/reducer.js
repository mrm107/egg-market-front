/*
 *
 * MyLoads reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SET_LOADS_DATA,
  SET_LOAD_STATS_DATA,
} from './constants';

const initialState = fromJS({
  stats: new Map(),
});

function myLoadsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_LOADS_DATA:
      return setLoadsData(state, action);
    default:
      return state;
  }
}

function setLoadsData(state, action) {
  const data = action.data;
  return state.set('loads', data);
}

export default myLoadsReducer;
