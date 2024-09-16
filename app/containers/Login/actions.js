/*
 *
 * Login actions
 *
 */

import axios from 'axios';
import {
  DEFAULT_ACTION,
  SET_CHECK_MOBILE_DATA,
  SET_FILL_DATA_RESPONSE,
  SET_CONFIRM_DATA,
  SET_RENEW_CONFIRM_CODE_STATUS,
  CLEAR_RENEW_CONFIRM_DATA,
  SET_PROFILE_DATA,
} from './constants';
import * as URLConsts from '../../utils/URLContansts';
import * as RootActions from '../Root/actions';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function checkMobileNumber(mobileNumber) {
  return function (dispatch) {
    const api = URLConsts.checkMobileNumberURL(mobileNumber);
    dispatch(setCheckMobileNumberData(undefined));
    axios.get(api)
      .then((response) => {
        dispatch(setCheckMobileNumberData(200));
      })
      .catch((error) => {
        // console.log(error.message);
      });
  };
}

export function setCheckMobileNumberData(data) {
  return {
    type: SET_CHECK_MOBILE_DATA,
    data,
  };
}

export function confirm(mobileNumber, code) {
  return function (dispatch) {
    const api = URLConsts.confirmURL(mobileNumber, code);
    console.log(code, mobileNumber, api);
    axios.get(api)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        // dispatch(setConfirmResponse(response.status));
        dispatch(setConfirmResponse({
          status: response.status,
          time: Date.now(),
        }));
        dispatch(RootActions.checkToken());
        dispatch(RootActions.getBookmarks());
      })
      .catch((error) => {
        dispatch(setConfirmResponse({
          status: 401,
          time: Date.now(),
        }));
        // console.log(error.message);
      });
  };
}

export function setConfirmResponse(data) {
  return {
    type: SET_CONFIRM_DATA,
    data,
  };
}

export function completingCustomerData(data) {
  return function (dispatch) {
    const api = URLConsts.completingCustomerDataURL;
    const token = localStorage.getItem('token');
    axios.post(api, data, {
      headers: { Authorization: token },
    })
      .then((response) => {
        dispatch(setFillDataResponse(response.status));
      })
      .catch((error) => {
        // console.log(error.message);
      });
  };
}

export function setFillDataResponse(data) {
  return {
    type: SET_FILL_DATA_RESPONSE,
    data,
  };
}

export function renewConfirmCode(mobileNumber, type) {
  return function (dispatch) {
    const api = URLConsts.renewConfirmCodeURL(mobileNumber, type);
    axios.get(api)
      .then((response) => {
        dispatch(setRenewConfirmCodeResponse(response.status));
      })
      .catch((error) => {
        // console.log(error.message);
      });
  };
}

export function setRenewConfirmCodeResponse(data) {
  return {
    type: SET_RENEW_CONFIRM_CODE_STATUS,
    data,
  };
}

export function clearRenewConfirmData() {
  return {
    type: CLEAR_RENEW_CONFIRM_DATA,
  };
}

export function checkToken() {
  return function (dispatch) {
    const api = URLConsts.getCustomerProfileURL;
    const token = localStorage.getItem('token');
    axios.post(api, {}, {
      headers: { Authorization: token },
    })
      .then((response) => {
        dispatch(setCheckTokenResponse(response.status));
      })
      .catch((error) => {
        dispatch(setCheckTokenResponse(error.response.status));
        // console.log(error.message);
      });
  };
}

function setCheckTokenResponse(data) {
  return {
    type: SET_PROFILE_DATA,
    data,
  };
}
