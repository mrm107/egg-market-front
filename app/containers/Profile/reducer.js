/*
 *
 * Profile reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
    SET_PROFILE_DATA
} from './constants';

const initialState = fromJS({});

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
      case  SET_PROFILE_DATA:
        return setProfileData(state, action);
    default:
      return state;
  }
}

function setProfileData(state, action){
  let data = action.data;
  return state.set('profileData', data);
}

export default profileReducer;
