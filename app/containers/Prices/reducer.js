/*
 *
 * Prices reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SET_PRICES_ACTION,
} from './constants';

const initialState = fromJS({
  sharePricesResponse: new Map(),
});

function pricesReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_PRICES_ACTION:
      return setPrices(state, action);
    default:
      return state;
  }
}

function setPrices(state, action) {
  const pricesData = action.data;
  return state.set('prices', pricesData);
}

export default pricesReducer;
