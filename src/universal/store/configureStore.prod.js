import { createStore, applyMiddleware, compose } from 'redux'
import { browserHistory } from 'react-router'
import { syncHistory } from 'react-router-redux'
import promiseMiddleware from 'universal/lib/promiseMiddleware'
import Reducers from 'universal/reducers'

const reduxRouterMiddleware = syncHistory(browserHistory)

const finalCreateStore = compose(
  applyMiddleware(promiseMiddleware, reduxRouterMiddleware)
)(createStore)

export default function configureStore(initialState) {
  const store = finalCreateStore(Reducers, initialState)

  reduxRouterMiddleware.listenForReplays(store)

  return store
}
