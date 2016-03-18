import 'babel-polyfill'
import 'stylesheets/main'
import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import immutifyState from 'universal/lib/immutifyState'
import routers from 'universal/routers'
import configureStore from 'universal/store/configureStore'


const initialState = immutifyState(JSON.parse(window.__INITIAL_STATE__))

const store = configureStore(browserHistory, initialState)
const routes = routers(store)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history} children={routes} />
  </Provider>
	, document.querySelector('#main')
)
