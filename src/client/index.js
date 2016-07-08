import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, browserHistory, Router } from 'react-router';
import useScroll from 'react-router-scroll';
import immutifyState from '../universal/lib/immutifyState';
import routers from '../universal/routers';
import configureStore from '../universal/store/configureStore';

// stylesheets
import '../stylesheets/main.scss';

const initialState = immutifyState(JSON.parse(window.__INITIAL_STATE__));

const store = configureStore(initialState);
const routes = routers(store);

render(
  <Provider store={store}>
    <Router
      history={browserHistory}
      children={routes}
      render={applyRouterMiddleware(useScroll())}
    />
  </Provider>
	, document.querySelector('#main')
);
