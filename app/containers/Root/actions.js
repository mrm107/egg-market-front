/*
 *
 * Root actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_PROVINCES_ACTION,
  SET_BOOKMARKS_ACTION,
  SET_SERVER_TIME,
  SET_PROFILE_DATA, SET_TOKEN_STATUS,
} from './constants';
import * as URLConsts from '../../utils/URLContansts';
import axios from 'axios';


export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getProvincesAction() {
  return (dispatch) => {
    dispatch(setProvinces([]));
    const api = URLConsts.getProvincesURL();
    const token = localStorage.getItem('token');
    axios.get(api, {
      headers: { Authorization: token },
    })
      .then((response) => {
        dispatch(setProvinces(response.data));
      })
      .catch((error) => {
        // console.log(error.message);
      });
  };
}

export function setProvinces(data) {
  return {
    type: SET_PROVINCES_ACTION,
    data,
  };
}

export function getBookmarks() {
  return (dispatch) => {
    dispatch(setBookmarks([]));
    const api = URLConsts.getShortBookmarksURL;
    const token = localStorage.getItem('token');
    axios.post(api, {}, {
      headers: { Authorization: token },
    })
      .then((response) => {
        dispatch(setBookmarks(response.data));
      })
      .catch((error) => {
        // console.log(error.message);
      });
  };
}

function setBookmarks(data) {
  return {
    type: SET_BOOKMARKS_ACTION,
    data,
  };
}

export function getServerTime() {
  return (dispatch) => {
    const api = URLConsts.getServerTime;
    const token = localStorage.getItem('token');
    axios.get(api, {}, {
      headers: { Authorization: token },
    })
      .then((response) => {
        dispatch(setServerTime(response.data.server_timestamp));
      })
      .catch((error) => {
        // console.log(error.message);
      });
  };
}

function setServerTime(time) {
  return {
    type: SET_SERVER_TIME,
    time,
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
        dispatch(setCheckTokenResponse(response));
        dispatch(setProfileData(response));
      })
      .catch((error) => {
        dispatch(setCheckTokenResponse(error.response.status));
        // console.log(error.message);
      });
  };
}

function setCheckTokenResponse(data) {
  return {
    type: SET_TOKEN_STATUS,
    data,
  };
}

function setProfileData(data) {
  return {
    type: SET_PROFILE_DATA,
    data,
  };
}

export function logout() {
  return function (dispatch) {
    const api = URLConsts.logoutURL;
    const token = localStorage.getItem('token');
    axios.post(api, {}, {
      headers: { Authorization: token },
    })
      .then((response) => {
        window.location.href = '/';
        dispatch(checkToken());
      })
      .catch((error) => {
        window.location.href = '/';
        // console.log(error.message);
      });
  };
}
