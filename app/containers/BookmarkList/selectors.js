import { createSelector } from 'reselect';

/**
 * Direct selector to the bookmarkList state domain
 */
const selectBookmarkListDomain = (state) => state.get('bookmarkList');

/**
 * Other specific selectors
 */


/**
 * Default selector used by BookmarkList
 */

const makeSelectBookmarkList = () => createSelector(
  selectBookmarkListDomain,
  (substate) => substate.toJS()
);

const makeSelectBookmarks = () => createSelector(
  selectBookmarkListDomain,
  (substate) => substate.get('bookmarks')
);

export {
  makeSelectBookmarkList,
  selectBookmarkListDomain,
  makeSelectBookmarks,
};
