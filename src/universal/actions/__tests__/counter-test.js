/* global jasmine:true */
import { fromJS } from 'immutable';
import configureMockStore from 'redux-mock-store';
import * as counterActions from '../counter';
import * as types from '../../constants/ActionTypes';
import promiseMiddleware from '../../lib/promiseMiddleware';

jest.unmock('../counter');
jest.unmock('../../constants/ActionTypes');
jest.unmock('../../lib/promiseMiddleware');

const middlewares = [promiseMiddleware];
const mockStore = configureMockStore(middlewares);

describe('actions: counter', () => {
  it('should incrementIfOdd with Odd', () => {
    const data = fromJS({
      clicked: 1,
    });
    const fn = counterActions.incrementIfOdd();
    expect(fn).toBeFunction();
    const dispatch = jasmine.createSpy();

    const getState = () => ({ counter: data });
    fn(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({ type: types.INCREMENT_COUNTER });
  });

  it('should incrementIfOdd with Even', () => {
    const data = fromJS({
      clicked: 2,
    });
    const fn = counterActions.incrementIfOdd();
    expect(fn).toBeFunction();
    const dispatch = jasmine.createSpy();
    const getState = () => ({ counter: data });
    fn(dispatch, getState);
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('should incrementAsync timer', () => {
    const store = mockStore({});
    store.dispatch(counterActions.incrementAsync());

    expect(setTimeout.mock.calls.length).toBe(1);
    expect(setTimeout.mock.calls).toHaveLength(1);
    expect(setTimeout.mock.calls[0][1]).toBe(1000);
  });

  it('should incrementAsync', (done) => {
    const expectedActions = [
      { type: types.INCREMENT_COUNTER },
    ];
    const store = mockStore({});

    jest.useRealTimers();

    store.dispatch(counterActions.incrementAsync())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(done)
      .catch(done);
  });
});
