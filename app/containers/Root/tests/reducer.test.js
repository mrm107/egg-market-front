
import { fromJS } from 'immutable';
import rootReducer from '../reducer';

describe('rootReducer', () => {
  it('returns the initial state', () => {
    expect(rootReducer(undefined, {})).toEqual(fromJS({}));
  });
});
