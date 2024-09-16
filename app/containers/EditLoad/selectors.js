import { createSelector } from 'reselect';

/**
 * Direct selector to the editLoad state domain
 */
const selectEditLoadDomain = (state) => state.get('editLoad');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EditLoad
 */

const makeSelectEditLoad = () => createSelector(
  selectEditLoadDomain,
  (substate) => substate.toJS()
);
const makeSelectMyLoadsData = () => createSelector(
    selectEditLoadDomain,
    (substate) => substate.get('loads')
);

const makeSelectSubmitResponse = () => createSelector(
    selectEditLoadDomain,
    (substate) => substate.get('response')
);

export {
  selectEditLoadDomain,
  makeSelectEditLoad,
    makeSelectMyLoadsData,
    makeSelectSubmitResponse,
};
