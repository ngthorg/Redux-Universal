'use strict';
import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from 'universal/containers/App'
import Home from 'universal/containers/Home'
import NotFound from 'universal/containers/NotFound'


export default (store) => (
	<Route component={App} >
		<Route path="/" component={Home} />
		<Route name="NotFound" path="*" component={NotFound} />
	</Route>
)
