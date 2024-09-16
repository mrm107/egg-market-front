import { createSelector } from 'reselect';

/**
 * Direct selector to the login state domain
 */
const selectLoginDomain = (state) => state.get('login');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Login
 */

const makeSelectLogin = () => createSelector(
  selectLoginDomain,
  (substate) => substate.toJS()
);

const makeSelectCheckMobileResponse = () => createSelector(
  selectLoginDomain,
  (substate) => substate.get('checkMobileResponse')
);

const makeSelectConfirmResponse = () => createSelector(
  selectLoginDomain,
  (substate) => substate.get('confirmResponse')
);

const makeSelectRenewConfirmResponse = () => createSelector(
  selectLoginDomain,
  (substate) => substate.get('renewConfirmCode')
);

const makeSelectCheckTokenResponse = () => createSelector(
    selectLoginDomain,
    (substate) => substate.get('checkTokenResponse')
);

export {
  makeSelectLogin,
  selectLoginDomain,
  makeSelectCheckMobileResponse,
  makeSelectConfirmResponse,
  makeSelectRenewConfirmResponse,
  makeSelectCheckTokenResponse,
};
