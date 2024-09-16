/*
 *
 * EditLoad actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_LOADS_DATA,
  SET_SUBMIT_RESPONSE,
} from './constants';
import * as URLConsts from '../../utils/URLContansts';
import axios from 'axios';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getMyLoadsData() {
  return function (dispatch) {
    const api = URLConsts.myLoadsURL;
    const token = localStorage.getItem('token');
    axios.post(api, {}, {
      headers: { Authorization: token },
    })
      .then((response) => {
        dispatch(setMyLoadsData(response.data.my_loads));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

export function setMyLoadsData(data) {
  return {
    type: SET_LOADS_DATA,
    data,
  };
}

export function editLoad(param) {
  return function (dispatch) {
    const api = URLConsts.editLoadURL;
    const token = localStorage.getItem('token');
    axios.post(api, param, {
      headers: { Authorization: token },
    })
      .then((response) => {
        dispatch(setEditResponse({
          status: response.status,
          time: Date.now(),
        }));
      })
      .catch((error) => {
        dispatch(setEditResponse({
          status: error.response.status,
          time: Date.now(),
        }));
        // console.log(error.message);
      });
  };
}

export function setEditResponse(response) {
  return {
    type: SET_SUBMIT_RESPONSE,
    response,
  };
}
