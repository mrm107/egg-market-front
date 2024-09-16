import { createSelector } from 'reselect';

/**
 * Direct selector to the list state domain
 */
const selectPricesDomain = (state) => state.get('prices');
const selectRootDomain = (state) => state.get('root');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Prices
 */


const makeSelectPrices = () => createSelector(
  selectPricesDomain,
  (substate) => substate.get('prices')
);

const makeSelectServerTime = () => createSelector(
  selectRootDomain,
  (substate) => substate.get('serverTime')
);


export {
  selectPricesDomain,
  makeSelectPrices,
  selectRootDomain,
  makeSelectServerTime,
};
