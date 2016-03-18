import {
	INCREMENT_COUNTER
	, DECREMENT_COUNTER
} from 'universal/constants/ActionTypes'


export function increment() {
  return {
    type: INCREMENT_COUNTER
  }
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  }
}

export function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState()

    if (counter.get('clicked') % 2 === 0) {
      return
    }

    dispatch(increment())
  }
}

// // Common function
// export function incrementAsync(delay = 1000) {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(increment())
//     }, delay)
//   }
// }

// using Promise
export function incrementAsync(delay = 1000) {
  return dispatch => new Promise((resolve) => {
    setTimeout(() => {
      resolve(dispatch(increment()))
    }, delay)
  })
}
