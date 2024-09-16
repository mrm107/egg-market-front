/*
 *
 * LoadCards actions
 *
 */

import * as RootActions from '../Root/actions';
import * as URLConsts from '../../utils/URLContansts';
import axios from 'axios';
import {
  DEFAULT_ACTION,
  SET_SHARE_LOAD_RESPONSE,
  CLEAR_SHARE_LOAD_RESPONSE,
  SET_CONTACT_INFO,
  SET_LOAD_STATS_DATA,
  SET_DELETE_LOAD_DATA,
  CLEAR_DELETE_LOAD_RESPONSE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setLoadBookmarked(loadId) {
  return (dispatch) => {
    const api = URLConsts.setLoadBookmarkedURL;
    const token = localStorage.getItem('token');
    axios.post(api, {
      loadID: loadId,
    }, {
      headers: { Authorization: token },
    })
      .then((response) => {
        dispatch(RootActions.getBookmarks());
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

export function removeLoadFromBookmarks(loadId) {
  return (dispatch) => {
    const api = URLConsts.removeLoadFromBookMarksURL;
    const token = localStorage.getItem('token');
    axios.post(api, {
      loadID: loadId,
    }, {
      headers: { Authorization: token },
    })
      .then((response) => {
        dispatch(RootActions.getBookmarks());
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

export function shareLoad(dataParam) {
  return (dispatch) => {
    const api = URLConsts.shareLoadURL;
    const token = localStorage.getItem('token');
    axios.post(api, dataParam, {
      headers: { Authorization: token },
    })
      .then((response) => {
        dispatch(setShareLoadResponse(response.status, dataParam.loadID));
      })
      .catch((error) => {
        dispatch(setShareLoadResponse(error.response.status, dataParam.loadID));
        console.log(error.message);
      });
  };
}

function setShareLoadResponse(response, loadID) {
  return {
    type: SET_SHARE_LOAD_RESPONSE,
    response,
    loadID,
  };
}

export function clearShareLoadResponse(loadID) {
  return {
    type: CLEAR_SHARE_LOAD_RESPONSE,
    loadID,
  };
}

export function getLoadContacts(dataParam) {
  return (dispatch) => {
    const api = URLConsts.getLoadContactURL;
    const token = localStorage.getItem('token');
    axios.post(api, dataParam, {
      headers: { Authorization: token },
    })
      .then((response) => {
        dispatch(setContactInfo(response.data, dataParam.loadID));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

function setContactInfo(data, loadID) {
  return {
    type: SET_CONTACT_INFO,
    data,
    loadID,
  };
}


export function deleteLoad(param) {
  return function (dispatch) {
    const api = URLConsts.deleteLoadURL;
    const token = localStorage.getItem('token');
    axios.post(api, param, {
      headers: { Authorization: token },
    })
      .then((response) => {
        dispatch(setDeleteLoad(response.status, param.loadID));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

function setDeleteLoad(data, loadID) {
  return {
    type: SET_DELETE_LOAD_DATA,
    data,
    loadID,
  };
}

export function clearDeleteResponse(loadID) {
  return {
    type: CLEAR_DELETE_LOAD_RESPONSE,
    loadID,
  };
}


export function getLoadStats(param) {
  return function (dispatch) {
    const api = URLConsts.loadStatsURL;
    const token = localStorage.getItem('token');
    axios.post(api, param, {
      headers: { Authorization: token },
    })
      .then((response) => {
        dispatch(setLoadStats(response.data, param.loadID));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

function setLoadStats(data, loadID) {
  return {
    type: SET_LOAD_STATS_DATA,
    data,
    loadID,
  };
}

export function sendOffer(param) {
  return function (dispatch) {
    const api = URLConsts.sendOffer;
    const token = localStorage.getItem('token');
    axios.post(api, param, {
      headers: { Authorization: token },
    })
      .then((response) => {
        alert('پیشنهاد قیمت شما با موفقیت ثبت شد. بزودی همکاران ما با شما تماس میگیرند.');
      })
      .catch((error) => {
        alert('ثبت پیشنهاد با مشکل مواجه شد، لطفا مجددا تلاش نمایید.');
        console.log(error.message);
      });
  };
}
