/*
 *
 * Profile actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_PROFILE_DATA,
  SET_FILL_PROFILE_RESPONSE,
} from './constants';
import * as URLConsts from '../../utils/URLContansts';
import axios from 'axios';


export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getProfileData() {
  return function (dispatch) {
    const api = URLConsts.getCustomerProfileURL;
    const token = localStorage.getItem('token');
    axios.post(api, {}, {
      headers: { Authorization: token },
    })
      .then((response) => {
        dispatch(setProfileData(response.data.profile));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

function setProfileData(data) {
  return {
    type: SET_PROFILE_DATA,
    data,
  };
}

export function fillProfile(param) {
  return function (dispatch) {
    const api = URLConsts.completingCustomerDataURL;
    const token = localStorage.getItem('token');
    axios.post(api, param, {
      headers: { Authorization: token },
    })
      .then((response) => {
        alert('تغییرات با موفقیت ذخیره شد.');
        dispatch(getProfileData());
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}
