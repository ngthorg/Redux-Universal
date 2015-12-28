import {
	GET_USER_REQUEST
	, GET_USER_SUCCESS
	, GET_USER_FAIL
} from 'universal/actions/actionsTypes'
import merge from 'lodash/object/merge'


const initialState = {
  users: {}
}

export default function counter(state = initialState, action) {
  switch (action.type) {
    case GET_USER_REQUEST:
			return merge({}, state, {
				users: {
					[action.user]: undefined
				}
			})
    case GET_USER_SUCCESS:
			return merge({}, state, {
				users: {
					[action.user]: { ...action.data }
				}
			})
    case GET_USER_FAIL:
			return merge({}, state, {
				users: {
					[action.user]: { loading: false }
				}
			})
    default:
      return state
  }
}
