/*
 *
 * List actions
 *
 */

import axios from 'axios';
import {
  DEFAULT_ACTION,
  SET_LOADS_ACTION,
} from './constants';
import * as URLConsts from '../../utils/URLContansts';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getLoadsAction(parameters) {
  return (dispatch) => {
    const api = URLConsts.getLoadsURL();
    const token = localStorage.getItem('token');

    axios.post(api, parameters, {
      headers: { Authorization: token },
    })
      .then((response) => {
        dispatch(setLoads(response.data));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

export function setLoads(data) {
  return {
    type: SET_LOADS_ACTION,
    data,
  };
}
