/*
 *
 * Root reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SET_PROVINCES_ACTION,
  SET_BOOKMARKS_ACTION,
  SET_SERVER_TIME,
  SET_PROFILE_DATA, SET_TOKEN_STATUS,
} from './constants';

const initialState = fromJS({});

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_PROVINCES_ACTION:
      return setProvinces(state, action);
    case SET_BOOKMARKS_ACTION:
      return setBookmarks(state, action);
    case SET_SERVER_TIME:
      return setServerTime(state, action);
    case SET_TOKEN_STATUS:
      return setCheckTokenResponse(state, action);
    case SET_PROFILE_DATA:
      return setProfileDate(state, action);
    default:
      return state;
  }
}

function setProvinces(state, action) {
  const provincesData = action.data.provinces;
  return state.set('provinces', provincesData);
}

function setBookmarks(state, action) {
  const bookmarksData = action.data.bookmarks;
  return state.set('bookmarks', bookmarksData);
}

function setServerTime(state, action) {
  const time = action.time;
  return state.set('serverTime', time);
}

function setCheckTokenResponse(state, action) {
  const response = action.data.status;
  return state.set('checkTokenResponse', response);
}

function setProfileDate(state, action) {
  const profileData = action.data.data.profile;
  return state.set('profile', profileData);
}

export default rootReducer;
