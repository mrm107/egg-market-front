import { createSelector } from 'reselect';

/**
 * Direct selector to the myLoads state domain
 */
const selectMyLoadsDomain = (state) => state.get('myLoads');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MyLoads
 */

const makeSelectMyLoads = () => createSelector(
  selectMyLoadsDomain,
  (substate) => substate.toJS()
);

const makeSelectMyLoadsData = () => createSelector(
    selectMyLoadsDomain,
    (substate) => substate.get('loads')
);

export {
  selectMyLoadsDomain,
    makeSelectMyLoads,
    makeSelectMyLoadsData,
};
