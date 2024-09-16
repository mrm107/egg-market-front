
import { fromJS } from 'immutable';
import submitLoadReducer from '../reducer';

describe('submitLoadReducer', () => {
  it('returns the initial state', () => {
    expect(submitLoadReducer(undefined, {})).toEqual(fromJS({}));
  });
});
