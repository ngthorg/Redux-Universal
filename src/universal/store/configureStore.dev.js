import { createStore, applyMiddleware, compose } from 'redux'
import { fromJS } from 'immutable'
import createLogger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import promiseMiddleware from 'universal/lib/promiseMiddleware'
import Reducers from 'universal/reducers'


export default function configureStore(history, initialState) {
  const finalCreateStore = compose(
    applyMiddleware(promiseMiddleware, routerMiddleware(history), createLogger({
      // development using redux-logger with Immutable
      stateTransformer: state => fromJS(state).toJS()
    })))(
      /**
      * using redux-devtools-extension
      * https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
      */
      window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore
    )
  const store = finalCreateStore(Reducers, initialState)

  if (module.hot) {
    module.hot.accept('universal/reducers', () =>
      store.replaceReducer(require('universal/reducers').default)
    )
  }

  return store
}
