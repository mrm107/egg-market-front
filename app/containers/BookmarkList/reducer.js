/*
 *
 * BookmarkList reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_BOOKMARKS_ACTION,
} from './constants';

const initialState = fromJS({
  shareLoadResponse: new Map(),
});

function bookmarkListReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BOOKMARKS_ACTION:
      return setBookmarks(state, action);
    default:
      return state;
  }
}

function setBookmarks(state, action) {
  const bookmarksData = action.data.bookmarks;
  return state.set('bookmarks', bookmarksData);
}

export default bookmarkListReducer;
