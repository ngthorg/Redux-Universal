import { createStore, applyMiddleware, compose } from 'redux'
import { fromJS } from 'immutable'
import createLogger from 'redux-logger'
import { browserHistory } from 'react-router'
import { syncHistory } from 'react-router-redux'
import promiseMiddleware from 'universal/lib/promiseMiddleware'
import Reducers from 'universal/reducers'

const reduxRouterMiddleware = syncHistory(browserHistory)

const finalCreateStore = compose(
  applyMiddleware(promiseMiddleware, reduxRouterMiddleware, createLogger({
		// development using redux-logger with Immutable
		stateTransformer: (state) => {
			return fromJS(state).toJS()
		}
	})))(
    /**
     * using redux-devtools-extension
     * https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
     */
    window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore
  )

export default function configureStore(initialState) {
  const store = finalCreateStore(Reducers, initialState)

  if (module.hot) {
    module.hot.accept('universal/reducers', () =>
      store.replaceReducer(require('universal/reducers').default)
    )
  }

  reduxRouterMiddleware.listenForReplays(store)

  return store
}
