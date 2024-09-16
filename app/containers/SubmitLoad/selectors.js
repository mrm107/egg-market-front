import { createSelector } from 'reselect';

/**
 * Direct selector to the submitLoad state domain
 */
const selectSubmitLoadDomain = (state) => state.get('submitLoad');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SubmitLoad
 */

const makeSelectSubmitLoad = () => createSelector(
  selectSubmitLoadDomain,
  (substate) => substate.toJS()
);

const makeSelectSubmitResponse = () => createSelector(
    selectSubmitLoadDomain,
    (substate) => substate.get('response')
);

export {
  selectSubmitLoadDomain,
    makeSelectSubmitLoad,
    makeSelectSubmitResponse,
};
