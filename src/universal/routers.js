import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  App,
  Home,
  Form,
  UserName,
  Search,
  SearchName,
  NotFound,
  ElastiStack,
} from './views';


export default () => (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route name="user" path="user/:name" component={UserName} />
    <Route name="elasticstack" path="elasticstack" component={ElastiStack} />
    <Route name="form" path="form" component={Form} />
    <Route name="search" path="search" component={Search}>
      <Route name="searchName" path=":name" component={SearchName} />
    </Route>
    <Route name="NotFound" path="*" component={NotFound} />
  </Route>
);
