/*
 *
 * Prices actions
 *
 */

import axios from 'axios';

import {
  DEFAULT_ACTION,
  SET_PRICES_ACTION,
} from './constants';
import * as URLConsts from '../../utils/URLContansts';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getPricesAction(parameter) {
  const { date } = parameter;
  return (dispatch) => {
    const dateString = date;

    const api = URLConsts.getPricesURL(dateString);
    const token = localStorage.getItem('token');

    axios.get(api, {
      headers: { Authorization: token },
    })
      .then((response) => {
        dispatch(setPrices(response.data));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

export function setPrices(data) {
  return {
    type: SET_PRICES_ACTION,
    data,
  };
}
