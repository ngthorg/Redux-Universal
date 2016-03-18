const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const fromImages = path.resolve(__dirname, 'src/client/images')
const toImages = path.resolve(__dirname, 'images')

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './src/client/index.js'
  ],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/bundle.js',
    publicPath: '/'
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
          presets: ['es2015', 'react', 'stage-0', 'react-hmre'],
          plugins: [
            'syntax-async-functions',
            'transform-decorators-legacy'
          ]
        }
      }, {
        test: /\.(sass|scss|css)$/,
        loaders: [
          'style-loader',
          'css-loader',
          'autoprefixer-loader',
          'sass-loader?indentedSyntax=scss&includePaths[]=' + path.join(__dirname, 'src') + '&includePaths[]=' + path.join(__dirname, 'node_modules')
        ]
      }, {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=10240&name=icons/[name].[ext]'
      }, {
        test: /\.(eot|woff2|woff|ttf|svg)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    // Simply copies the files over
    new CopyWebpackPlugin([
      { from: fromImages, to: toImages }
    ]),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
}
