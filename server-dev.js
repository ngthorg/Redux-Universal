require('babel-core/register')
require('babel-polyfill')

global.__DEV__ = true

const express = require('express')
const webpack = require('webpack')
const cookieParser = require('cookie-parser')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config-dev')

const app = express()
const render = require('server').default
const port = process.env.PORT || 3000

const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath, stats: { colors: true } }))
app.use(webpackHotMiddleware(compiler))

app.use(cookieParser())

app.get('*', render)


app.use(function (req, res, next) {
  const err = new Error('Not Found!')
  err.status = 404
  next(err)
})

app.use(function (err, req, res) {
  const status = err.status || 500
  res.status(status)
  res.json({
    message: err.message,
    status: status
  })
})

app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
