import { createSelector } from 'reselect';

/**
 * Direct selector to the loadPage state domain
 */
const selectLoadPageDomain = (state) => state.get('loadPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LoadPage
 */

const makeSelectLoadPage = () => createSelector(
  selectLoadPageDomain,
  (substate) => substate.toJS()
);

const makeSelectLoadData = () => createSelector(
  selectLoadPageDomain,
  (substate) => substate.get('loads')
);

export {
  selectLoadPageDomain,
  makeSelectLoadPage,
  makeSelectLoadData,
};
