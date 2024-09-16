
import { fromJS } from 'immutable';
import myLoadsReducer from '../reducer';

describe('myLoadsReducer', () => {
  it('returns the initial state', () => {
    expect(myLoadsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
