/*
 *
 * LoadCards reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SET_SHARE_LOAD_RESPONSE,
  CLEAR_SHARE_LOAD_RESPONSE,
  SET_CONTACT_INFO,
  SET_LOAD_STATS_DATA, SET_DELETE_LOAD_DATA,
  CLEAR_DELETE_LOAD_RESPONSE,
} from './constants';

const initialState = fromJS({
  shareLoadResponse: new Map(),
  contactInfo: new Map(),
  stats: new Map(),
  deleteLoadStatus: new Map(),
});

function loadCardsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_SHARE_LOAD_RESPONSE:
      return setShareLoadResponse(state, action);
    case CLEAR_SHARE_LOAD_RESPONSE:
      return clearShareLoadResponse(state, action);
    case SET_CONTACT_INFO:
      return setContactInfo(state, action);
    case SET_LOAD_STATS_DATA:
      return setLoadStat(state, action);
    case SET_DELETE_LOAD_DATA:
      return setDeleteLoad(state, action);
    case CLEAR_DELETE_LOAD_RESPONSE:
      return clearDeleteLoadResponse(state, action);
    default:
      return state;
  }
}

function setShareLoadResponse(state, action) {
  const response = action.response;
  const loadId = action.loadID;
  let responseMap = state.get('shareLoadResponse');
  responseMap = responseMap.set(loadId, response);
  state = state.set(loadId, response);
  return state.set('shareLoadResponse', responseMap);
}

function clearShareLoadResponse(state, action) {
  const loadID = action.loadID;
  let responseMap = state.get('shareLoadResponse');
  responseMap = responseMap.delete(loadID);
  state = state.delete(loadID);
  return state.set(responseMap);
}

function setContactInfo(state, action) {
  const data = action.data;
  const loadId = action.loadID;
  let responseMap = state.get('contactInfo');
  responseMap = responseMap.set(loadId, data);
  state = state.set(loadId, data);
  return state.set('contactInfo', responseMap);
}

function setLoadStat(state, action) {
  const data = action.data;
  const loadID = action.loadID;
  let stats = state.get('stats');
  state = state.set(loadID, data);
  stats = stats.set(loadID, data);
  return state.set('stats', stats);
}

function setDeleteLoad(state, action) {
  const response = action.data;
  const loadId = action.loadID;
  let responseMap = state.get('deleteLoadStatus');
  responseMap = responseMap.set(loadId, response);
  state = state.set(loadId, response);
  return state.set('deleteLoadStatus', responseMap);
}

function clearDeleteLoadResponse(state, action) {
  const loadID = action.loadID;
  let responseMap = state.get('deleteLoadStatus');
  responseMap = responseMap.delete(loadID);
  state = state.delete(loadID);
  return state.set(responseMap);
}


export default loadCardsReducer;
