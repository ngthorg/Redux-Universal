import { createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'universal/lib/promiseMiddleware'
import Reducers from 'universal/reducers'

const finalCreateStore = compose(
  applyMiddleware(promiseMiddleware)
)(createStore)

export default function configureStore(initialState) {
  return finalCreateStore(Reducers, initialState)
}
