require('babel-core/register');
require('babel-polyfill');

const express = require('express');
const webpack = require('webpack');
const cookieParser = require('cookie-parser');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config-dev');

const app = express();
const render = require('./src/server');
const port = process.env.PORT || 3000;

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: { colors: true },
}));
app.use(webpackHotMiddleware(compiler));

app.use(cookieParser());
app.use('/node_modules', express.static('node_modules'));

app.get('*', render);

app.use((req, res, next) => {
  const err = new Error('Not Found!');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  const status = err.status || 500;
  res.status(status);
  res.json({
    message: err.message,
    status,
  });
});

app.listen(port, () => {
  console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
});
