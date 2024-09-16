
import { fromJS } from 'immutable';
import editLoadReducer from '../reducer';

describe('editLoadReducer', () => {
  it('returns the initial state', () => {
    expect(editLoadReducer(undefined, {})).toEqual(fromJS({}));
  });
});
