
import { fromJS } from 'immutable';
import listReducer from '../reducer';

describe('listReducer', () => {
  it('returns the initial state', () => {
    expect(listReducer(undefined, {})).toEqual(fromJS({}));
  });
});
