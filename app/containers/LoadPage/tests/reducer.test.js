
import { fromJS } from 'immutable';
import loadPageReducer from '../reducer';

describe('loadPageReducer', () => {
  it('returns the initial state', () => {
    expect(loadPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
