import {
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	GET_USER_FAIL,
} from '../constants/ActionTypes';
import { fromJS, Map } from 'immutable';


const initialState = fromJS({
  users: {},
});

export default function counter(state = initialState, action) {
  switch (action.type) {
    case GET_USER_REQUEST:
      return state.merge({
        users: state.get('users').set(action.user, undefined),
      });
    case GET_USER_SUCCESS:
      return state.merge({
        users: state.get('users').set(action.user, new Map(action.data)),
      });
    case GET_USER_FAIL:
      return state.merge({
        users: state.get('users').set(action.user, new Map({ loading: false })),
      });
    default:
      return state;
  }
}
