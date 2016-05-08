import Axios from 'axios';
import {
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	GET_USER_FAIL,
} from '../constants/ActionTypes';
import { API_URL } from '../../config';


export function fetchUser(login) {
  return {
    types: [GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAIL],
    promise: Axios.get(`${API_URL}/users/${login}`),
    user: login,
  };
}


export function getUser(login, requiredFields = []) {
  return (dispatch, getState) => {
    const user = getState().github.getIn(['users', login]);

    if (user && requiredFields.every(key => user.has(key))
      || user && user.get('loading') === false) {
      return null;
    }

    return dispatch(fetchUser(login));
  };
}
