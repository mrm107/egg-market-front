/*
 *
 * SubmitLoad actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_SUBMIT_RESPONSE,
} from './constants';
import * as URLConsts from '../../utils/URLContansts';
import axios from 'axios';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function submitLoad(param) {
  return function (dispatch) {
    const api = URLConsts.addLoadURL;
    const token = localStorage.getItem('token');
    axios.post(api, param, {
      headers: { Authorization: token },
    })
      .then((response) => {
        dispatch(setSubmitResponse({
          status: response.status,
          time: Date.now(),
        }));
      })
      .catch((error) => {
        dispatch(setSubmitResponse({
          status: error.response.status,
          time: Date.now(),
        }));
        // console.log(error.message);
      });
  };
}

function setSubmitResponse(response) {
  return {
    type: SET_SUBMIT_RESPONSE,
    response,
  };
}

