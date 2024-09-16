/*
 *
 * LoadPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SET_LAOD_DATA,
} from './constants';

const initialState = fromJS({
  loads: new Map(),
  shareLoadResponse: new Map(),
});

function loadPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_LAOD_DATA:
      return setLoadData(state, action);
    default:
      return state;
  }
}

function setLoadData(state, action) {
  const load = action.data;
  const id = action.id;
  const loads = state.get('loads');
  loads.set(id, load);
  state = state.set(id, load);
  return state.set('loads', loads);
}

export default loadPageReducer;
