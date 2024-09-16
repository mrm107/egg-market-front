/*
 *
 * SubmitLoad reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SET_SUBMIT_RESPONSE,
} from './constants';

const initialState = fromJS({});

function submitLoadReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_SUBMIT_RESPONSE:
      return setSubmitResponse(state, action);
    default:
      return state;
  }
}

function setSubmitResponse(state, action) {
  const res = action.response;
  return state.set('response', res);
}

export default submitLoadReducer;
