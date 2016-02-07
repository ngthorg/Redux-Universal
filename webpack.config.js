const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const sassLoaders = [
  'css-loader',
  'autoprefixer-loader',
  'sass-loader?indentedSyntax=scss&includePaths[]=' + path.join(__dirname, 'src') + '&includePaths[]=' + path.join(__dirname, 'node_modules')
]

module.exports = {
  entry: [
    './src/client/index.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.sass', '.scss', '.css'],
    modulesDirectories: ['src', 'node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['syntax-async-functions', 'transform-decorators-legacy']
        }
      }, {
        test: /\.(sass|scss|css)$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'), {
          publicPath: '/'
        })
      }, {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=10240'
      }, {
        test: /\.(eot|woff2|woff|ttf|svg)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/style.css'),
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: { warnings: false },
      output: { comments: false }
    })
  ]
}
