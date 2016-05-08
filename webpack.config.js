const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

const fromImages = path.resolve(__dirname, 'src/client/images');
const toImages = path.resolve(__dirname, 'public/images');
const sassLoaders = ['css', 'sass', 'postcss'];


module.exports = {
  entry: [
    './src/client/index.js',
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.sass', '.scss', '.css'],
    modulesDirectories: ['src', 'node_modules'],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['syntax-async-functions', 'transform-decorators-legacy'],
        },
      }, {
        test: /\.(sass|scss|css)$/,
        loader: ExtractTextPlugin.extract('style', sassLoaders.join('!'), {
          publicPath: '/',
        }),
      }, {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=10240&name=icons/[name].[ext]',
      }, {
        test: /\.(eot|woff2|woff|ttf|svg)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
    ],
  },
  sassLoader: {
    includePaths: ['src', 'node_modules'],
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] }),
  ],
  plugins: [
    // Simply copies the files over
    new CopyWebpackPlugin([
      { from: fromImages, to: toImages },
    ]),
    new ExtractTextPlugin('/css/style.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: { warnings: false },
      output: { comments: false },
    }),
  ],
};
