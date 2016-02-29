import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'universal/containers/App'
import Home from 'universal/containers/Home'
import User from 'universal/containers/User'
import Form from 'universal/containers/Form'
import Search from 'universal/containers/Search'
import SearchAll from 'universal/containers/SearchAll'
import NotFound from 'universal/containers/NotFound'
import Test from 'universal/containers/Test'


export default () => (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route name="user" path="user/:name" component={User} />
    <Route name="test" path="test" component={Test} />
    <Route name="form" path="form" component={Form} />
    <Route name="search" path="search" component={Search}>
      <Route name="searchAll" path=":text" component={SearchAll} />
    </Route>
    <Route name="NotFound" path="*" component={NotFound} />
  </Route>
)
