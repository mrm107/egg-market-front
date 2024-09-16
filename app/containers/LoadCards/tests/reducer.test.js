
import { fromJS } from 'immutable';
import loadCardsReducer from '../reducer';

describe('loadCardsReducer', () => {
  it('returns the initial state', () => {
    expect(loadCardsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
