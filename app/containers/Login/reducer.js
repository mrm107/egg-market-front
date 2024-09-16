/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, SET_CHECK_MOBILE_DATA, SET_CONFIRM_DATA,
  SET_RESPONSE_DATA, SET_RENEW_CONFIRM_CODE_STATUS, CLEAR_RENEW_CONFIRM_DATA, SET_PROFILE_DATA,
} from './constants';

const initialState = fromJS({});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_RESPONSE_DATA:
      return setResponseData(state, action);
    case SET_CHECK_MOBILE_DATA:
      return setCheckMobileResponse(state, action);
    case SET_CONFIRM_DATA:
      return setConfirmResponse(state, action);
    case SET_RENEW_CONFIRM_CODE_STATUS:
      return setRenewConfirmCodeResponse(state, action);
    case CLEAR_RENEW_CONFIRM_DATA:
      return clearRenewConfirmResponse(state, action);
    case SET_PROFILE_DATA:
      return setCheckTokenResponse(state, action);
    default:
      return state;
  }
}

function setResponseData(state, action) {
  const gitHubData = action.data;
  return state.set('data', gitHubData);
}

function setCheckMobileResponse(state, action) {
  const response = action.data;
  return state.set('checkMobileResponse', response);
}

function setConfirmResponse(state, action) {
  const response = action.data;
  return state.set('confirmResponse', response);
}

function setRenewConfirmCodeResponse(state, action) {
  const response = action.data;
  return state.set('renewConfirmCode', response);
}

function clearRenewConfirmResponse(state, action) {
  return state.delete('renewConfirmCode');
}

function setCheckTokenResponse(state, action) {
  const response = action.data;
  return state.set('checkTokenResponse', response);
}

export default loginReducer;
