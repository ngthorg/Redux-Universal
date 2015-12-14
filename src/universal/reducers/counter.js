import {
	INCREMENT_COUNTER
	, DECREMENT_COUNTER
} from 'universal/actions/actionsTypes';
import Immutable, { Map, List } from 'immutable';

const initialState = new Immutable.fromJS({
  clicked: 0
});

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
			return state.update('clicked', val => val + 1);
    case DECREMENT_COUNTER:
			return state.update('clicked', val => val - 1);
    default:
      return state
  }
}
