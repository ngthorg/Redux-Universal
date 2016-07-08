import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import promiseMiddleware from '../lib/promiseMiddleware';
import Reducers from '../reducers';


export default function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(promiseMiddleware, routerMiddleware(browserHistory))
  )(createStore);

  const store = finalCreateStore(Reducers, initialState);

  syncHistoryWithStore(browserHistory, store);

  return store;
}
