import { createSelector } from 'reselect';

/**
 * Direct selector to the list state domain
 */
const selectListDomain = (state) => state.get('list');

/**
 * Other specific selectors
 */


/**
 * Default selector used by List
 */

const makeSelectList = () => createSelector(
  selectListDomain,
  (substate) => substate.toJS()
);

const makeSelectLoaders = () => createSelector(
  selectListDomain,
  (substate) => substate.get('loaders')
);

const makeSelectProvinces = () => createSelector(
  selectListDomain,
  (substate) => substate.get('provinces')
);

const makeSelectLoads = () => createSelector(
  selectListDomain,
  (substate) => substate.get('loads')
);

const makeSelectBookmarkList = () => createSelector(
  selectListDomain,
  (substate) => substate.get('bookmarks')
);

const makeSelectShareLoadResponse = () => createSelector(
  selectListDomain,
  (substate) => substate.get('shareLoadResponse')
);

export {
  makeSelectList,
  selectListDomain,
  makeSelectProvinces,
  makeSelectLoaders,
  makeSelectLoads,
  makeSelectBookmarkList,
  makeSelectShareLoadResponse,
};
