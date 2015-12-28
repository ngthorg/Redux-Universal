import React from 'react'
import { renderToString } from 'react-dom/server'
import { RoutingContext, match } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import serialize from 'serialize-javascript'
import promiseMiddleware from 'universal/lib/promiseMiddleware'
import routers from 'universal/routers'
import Reducers from 'universal/reducers'
import HtmlComponent from 'server/html'


export default async function (req, res, next) {
  const finalCreateStore = applyMiddleware(promiseMiddleware)(createStore)
  const store = finalCreateStore(Reducers, {})


  match({ routes: routers(store), location: req.url }, async (err, redirectLocation, routerState) => {
    try {
      if (err) {
        throw err
      }

      /**
       * if Redirect "chuyển hướng"
       * @param  {redirectLocation} object redirect
       */
      if(redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        return
      }

      /**
       * if name Router NotFound
       * render page 404 NotFound
       */
      if (routerState.routes[1].name === 'NotFound') {
        res.status(404)
      }

      const { params, location } = routerState
      const prepareRouteMethods = routerState.components.map(component => component.prepareRoute)
      for(const prepareRoute of prepareRouteMethods) {
        if (!prepareRoute) {
          continue
        }

        await prepareRoute({ store, params, location })
      }

      const body = renderToString(
        <Provider store={store}>
          <RoutingContext {...routerState} />
        </Provider>
      )

      const initialState = store.getState()
      const html = renderToString(<HtmlComponent markup={body} state={serialize(JSON.stringify(initialState))} />)

			res.send(`<!DOCTYPE html>` + html)
    } catch(err) {
      next(err)
    }
  })
}
