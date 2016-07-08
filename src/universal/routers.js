import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Form from './containers/Form';
import UserName from './containers/UserName';
import Search from './containers/Search';
import SearchName from './containers/SearchName';
import ElastiStack from './containers/ElastiStack';
import NotFound from './components/NotFound';
import Test from './containers/Test';


export default () => (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route name="user" path="user/:name" component={UserName} />
    <Route name="elasticstack" path="elasticstack" component={ElastiStack} />
    <Route name="form" path="form" component={Form} />
    <Route name="search" path="search" component={Search}>
      <Route name="searchName" path=":name" component={SearchName} />
    </Route>
    <Route name="test" path="test" component={Test} />
    <Route name="NotFound" path="*" component={NotFound} />
  </Route>
);
