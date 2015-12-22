import 'stylesheets/main'
import React from 'react'
import { fromJS } from 'immutable'
import { render } from 'react-dom'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { syncReduxAndRouter } from 'redux-simple-router'
import { createStore, applyMiddleware, compose } from 'redux'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import promiseMiddleware from 'universal/lib/promiseMiddleware'
import immutifyState from 'universal/lib/immutifyState'
import routers from 'universal/routers'
import Reducers from 'universal/reducers'


const history = new createBrowserHistory();
const initialState = immutifyState(JSON.parse(window.__INITIAL_STATE__));

let finalCreateStore;
if(__DEV__) {
	finalCreateStore = compose(
		applyMiddleware(promiseMiddleware, createLogger({
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
	);
} else {
	finalCreateStore = compose(
		applyMiddleware(promiseMiddleware)
	)(createStore)
}

const store = finalCreateStore(Reducers, initialState);
const routes = routers(store);

syncReduxAndRouter(history, store);

render(
	<Provider store={store}>
  	<Router history={history} children={routes} />
  </Provider>
	, document.querySelector('#main')
)
