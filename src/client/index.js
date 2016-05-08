import 'babel-polyfill';
import '../stylesheets/main.scss';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { applyRouterMiddleware, browserHistory, Router } from 'react-router';
import useScroll from 'react-router-scroll';
import immutifyState from '../universal/lib/immutifyState';
import routers from '../universal/routers';
import configureStore from '../universal/store/configureStore';

const initialState = immutifyState(JSON.parse(window.__INITIAL_STATE__));

const store = configureStore(browserHistory, initialState);
const routes = routers(store);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router
      history={history}
      children={routes}
      render={applyRouterMiddleware(useScroll())}
    />
  </Provider>
	, document.querySelector('#main')
);
