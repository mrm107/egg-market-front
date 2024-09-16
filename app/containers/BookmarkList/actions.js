/*
 *
 * BookmarkList actions
 *
 */
import axios from 'axios';
import {
  SET_BOOKMARKS_ACTION,
} from './constants';
import * as URLConsts from '../../utils/URLContansts';

export function getBookmarks() {
  return (dispatch) => {
    const api = URLConsts.getBookmarksURL();
    const token = localStorage.getItem('token');
    axios.post(api, {}, {
      headers: {Authorization: token},
    })
      .then((response) => {
        dispatch(setBookmarks(response.data));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

function setBookmarks(data) {
  return {
    type: SET_BOOKMARKS_ACTION,
    data,
  };
}
