
import { fromJS } from 'immutable';
import bookmarkListReducer from '../reducer';

describe('bookmarkListReducer', () => {
  it('returns the initial state', () => {
    expect(bookmarkListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
