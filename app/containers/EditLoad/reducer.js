/*
 *
 * EditLoad reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SET_LOADS_DATA,
  SET_SUBMIT_RESPONSE,
} from './constants';

const initialState = fromJS({});

function editLoadReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_LOADS_DATA:
      return setLoadsData(state, action);
    case SET_SUBMIT_RESPONSE:
      return setSubmitResponse(state, action);
    default:
      return state;
  }
}

function setLoadsData(state, action) {
  const data = action.data;
  return state.set('loads', data);
}

function setSubmitResponse(state, action) {
  const res = action.response;
  return state.set('response', res);
}

export default editLoadReducer;
