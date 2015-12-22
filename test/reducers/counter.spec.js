import expect from 'expect'
import counter from 'universal/reducers/counter'
import * as types from 'universal/actions/actionsTypes'


describe('reducers: counter', () => {

	it('action INCREMENT_COUNTER', () => {
    expect(
      counter({clicked: 0}, {
        type: types.INCREMENT_COUNTER
      })
    ).toEqual({
      clicked: 1
    })
	})

	it('action DECREMENT_COUNTER', () => {
		expect(
      counter({clicked: 1}, {
        type: types.DECREMENT_COUNTER
      })
    ).toEqual({
      clicked: 0
    })
	})

})
