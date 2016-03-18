import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import promiseMiddleware from 'universal/lib/promiseMiddleware'
import Reducers from 'universal/reducers'


export default function configureStore(history, initialState) {
  const finalCreateStore = compose(
    applyMiddleware(promiseMiddleware, routerMiddleware(history))
  )(createStore)

  const store = finalCreateStore(Reducers, initialState)

  return store
}
