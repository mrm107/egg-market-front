/*
 *
 * MyLoads actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_LOADS_DATA,
  SET_LOAD_STATS_DATA,
} from './constants';
import * as URLConsts from '../../utils/URLContansts';
import axios from 'axios';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getMyLoadsData( lastID = undefined) {
  return function (dispatch) {
    const api = URLConsts.myLoadsURL;
    const token = localStorage.getItem('token');
    axios.post(api, {
      lastID,
    }, {
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

function setMyLoadsData(data) {
  return {
    type: SET_LOADS_DATA,
    data,
  };
}
