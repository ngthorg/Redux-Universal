import { expect } from 'chai'
import counter from 'universal/reducers/counter'
import * as types from 'universal/actions/actionsTypes'
import { fromJS } from 'immutable'


describe('reducers counter', () => {

	it('action INCREMENT_COUNTER', () => {
    expect(
      counter(fromJS({clicked: 0}), {
        type: types.INCREMENT_COUNTER
      })
    ).to.equal(fromJS({
      clicked: 1
    }));
	})

	it('action DECREMENT_COUNTER', () => {
		expect(
			counter(fromJS({clicked: 1}), {
				type: types.DECREMENT_COUNTER
			})
		).to.equal(fromJS({
			clicked: 0
		}));
	})

})
