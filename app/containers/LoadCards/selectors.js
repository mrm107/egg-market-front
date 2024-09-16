import { createSelector } from 'reselect';

/**
 * Direct selector to the loadCards state domain
 */
const selectLoadCardsDomain = (state) => state.get('loadCards');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LoadCards
 */

const makeSelectLoadCards = () => createSelector(
  selectLoadCardsDomain,
  (substate) => substate.toJS(),
);

const makeSelectShareResponse = () => createSelector(
  selectLoadCardsDomain,
  (substate) => substate.get('shareLoadResponse'),
);

const makeSelecContactInfo = () => createSelector(
  selectLoadCardsDomain,
  (substate) => substate.get('contactInfo'),
);

const makeSelectLoadsStats = () => createSelector(
  selectLoadCardsDomain,
  (substate) => substate.get('stats'),
);

const makeSelectDeleteLoad = () => createSelector(
  selectLoadCardsDomain,
  (substate) => substate.get('deleteLoadStatus'),
);


export {
  makeSelectLoadCards,
  selectLoadCardsDomain,
  makeSelectShareResponse,
  makeSelecContactInfo,
  makeSelectLoadsStats,
  makeSelectDeleteLoad,
};
