/*
 *
 * LoadPage actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_LAOD_DATA,
} from './constants';
import * as URLConsts from '../../utils/URLContansts';
import axios from 'axios';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getLoad(data) {
  return function (dispatch) {
    const api = URLConsts.getLoadDataURL;
    const token = localStorage.getItem('token');
    axios.post(api, data, {
      headers: { Authorization: token },
    })
      .then((response) => {
        dispatch(setLoadData(response.data.load, data.loadID));
      })
      .catch((error) => {
        dispatch(setLoadData(error.response.status, data.loadID));
        console.log(error.message);
      });
  };
}

function setLoadData(data, id) {
  return {
    type: SET_LAOD_DATA,
    data,
    id,
  };
}
