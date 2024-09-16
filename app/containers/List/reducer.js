/*
 *
 * List reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SET_LOADS_ACTION,
} from './constants';

const initialState = fromJS({
  shareLoadResponse: new Map(),
});

function listReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_LOADS_ACTION:
      return setLoads(state, action);
    default:
      return state;
  }
}

function setLoads(state, action) {
  const loadsData = action.data.loads;
  return state.set('loads', loadsData);
}

export default listReducer;
