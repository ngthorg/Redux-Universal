import expect from 'expect'
import github from 'universal/reducers/github'
import * as types from 'universal/actions/actionsTypes'
import { fromJS } from 'immutable'


describe('reducers: github', () => {

	it('action GET_USER_REQUEST', () => {
    expect(
      github(fromJS({ users: {} }), {
        type: types.GET_USER_REQUEST
				, user: 'ngthorg'
      })
    ).toEqual(fromJS({
      users: {
				ngthorg: undefined
			}
    }))
	})

	it('action GET_USER_SUCCESS', () => {
		const data = {
			login: 'ngthorg',
			name: 'NgThong',
			avatar_url: 'https://avatars.githubusercontent.com/u/4083429?v=3',
			html_url: 'https://github.com/ngthorg',
			type: 'User'
		}

    expect(
      github(fromJS({ users: {} }), {
        type: types.GET_USER_SUCCESS
				, data: data
				, user: 'ngthorg'
      })
    ).toEqual(fromJS({
      users: {
				ngthorg: data
			}
    }))
	})

	it('action GET_USER_FAIL', () => {
    expect(
      github(fromJS({ users: {} }), {
        type: types.GET_USER_FAIL
				, user: 'ngthorg'
      })
    ).toEqual(fromJS({
      users: {
				ngthorg: {
					loading: false
				}
			}
    }))
	})

})
