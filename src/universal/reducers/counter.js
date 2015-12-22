import {
	INCREMENT_COUNTER
	, DECREMENT_COUNTER
} from 'universal/actions/actionsTypes'
import assign from 'lodash/object/assign'

const initialState = {
	clicked: 0
}

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
			return assign({}, state, {
				clicked: state.clicked + 1
			})
    case DECREMENT_COUNTER:
			return assign({}, state, {
				clicked: state.clicked - 1
			})
    default:
      return state
  }
}
