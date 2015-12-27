require('babel-core/register')
require("babel-polyfill")

global.__DEV__ = false;

const express = require('express')
const webpack = require('webpack')
const compress = require('compression')
const cookieParser = require('cookie-parser')
const app = express();
const render = require('server').default;
const port = process.env.PORT || 3000;


app.use(cookieParser());
app.use(compress());
app.use(express.static(__dirname + "/public", {maxage: 8640000}));


app.get("*", render)


app.use(function(req, res, next) {
  var err = new Error('Not Found!');
  err.status = 404;
  next(err);
})

app.use(function(err, req, res, next) {
  var status = err.status || 500;
  res.status(status);
	err.status
		? res.send(err.message)
		: res.send('Internal server error');
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
