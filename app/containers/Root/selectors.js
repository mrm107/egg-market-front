import { createSelector } from 'reselect';

/**
 * Direct selector to the root state domain
 */
const selectRootDomain = (state) => state.get('root');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Root
 */

const makeSelectRoot = () => createSelector(
  selectRootDomain,
  (substate) => substate.toJS()
);

const makeSelectProvinces = () => createSelector(
  selectRootDomain,
  (substate) => substate.get('provinces') || []
);

const makeSelectBookmarkList = () => createSelector(
  selectRootDomain,
  (substate) => substate.get('bookmarks') || []
);

const makeSelectServerTime = () => createSelector(
  selectRootDomain,
  (substate) => substate.get('serverTime')
);

const makeSelectTokenResponse = () => createSelector(
  selectRootDomain,
  (substate) => substate.get('checkTokenResponse')
);

const makeSelectProfile = () => createSelector(
  selectRootDomain,
  (substate) => substate.get('profile')
);

export {
  selectRootDomain,
  makeSelectRoot,
  makeSelectProvinces,
  makeSelectBookmarkList,
  makeSelectServerTime,
  makeSelectTokenResponse,
  makeSelectProfile,
};
