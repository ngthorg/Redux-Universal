import { fromJS } from 'immutable';
import counter from '../counter';
import * as types from '../../constants/ActionTypes';

jest.unmock('../counter');
jest.unmock('../../constants/ActionTypes');

describe('reducers: counter', () => {
  it('action INCREMENT_COUNTER', () => {
    expect(
      counter(fromJS({ clicked: 0 }), {
        type: types.INCREMENT_COUNTER,
      })
    ).toEqual(fromJS({
      clicked: 1,
    }));
  });

  it('action DECREMENT_COUNTER', () => {
    expect(
      counter(fromJS({ clicked: 1 }), {
        type: types.DECREMENT_COUNTER,
      })
    ).toEqual(fromJS({
      clicked: 0,
    }));
  });
});
