import expect from 'expect'
import { fromJS } from 'immutable'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import * as types from 'universal/actions/actionsTypes'
import * as githubActions from 'universal/actions/github'
import promiseMiddleware from 'universal/lib/promiseMiddleware'
import { API_URL } from 'config'


const middlewares = [ promiseMiddleware ]
const mockStore = configureMockStore(middlewares)

describe('actions: github', () => {

	it('should fetchUser', (done) => {
		const login = 'ngthorg'
		const data = {
			login: 'ngthorg',
			id: 8261421,
			avatar_url: 'https://avatars.githubusercontent.com/u/8261421?v=3'
		}
		nock(`${API_URL}/`)
      .get(`/users/${login}`)
      .reply(200, data)
		const expectedActions = [
      { type: types.GET_USER_REQUEST, user: login },
			{ type: types.GET_USER_SUCCESS, data, status: 200, user: login }
    ]
		const store = mockStore({}, expectedActions, done)
		store.dispatch(githubActions.fetchUser(login))
	})

	it('should getUser', (done) => {
		const login = 'ngthorg'
		const data = {
			login: 'ngthorg',
			id: 8261421,
			avatar_url: 'https://avatars.githubusercontent.com/u/8261421?v=3'
		}
		const datatest = fromJS({
			users: {}
		})
		nock(`${API_URL}/`)
      .get(`/users/${login}`)
      .reply(200, data)
		const expectedActions = [
      { type: types.GET_USER_REQUEST, user: login },
			{ type: types.GET_USER_SUCCESS, data, status: 200, user: login }
    ]
		const fn = githubActions.getUser(login, [ 'login' ])
		expect(fn).toBeA('function')
		const getState = () => ({ github: datatest })
		const store = mockStore(getState, expectedActions, done)
		store.dispatch(fn)
	})

})
