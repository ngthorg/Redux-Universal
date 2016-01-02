var path = require('path')
var webpack = require('webpack')


module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './src/client/index.js'
  ],
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
          presets: ["es2015", "react", "stage-0"],
          plugins: [
            ['transform-runtime'],
            ['syntax-async-functions'],
            ['transform-decorators-legacy'],
            [ 'react-transform',
              { transforms: [
                  {
                    transform: 'react-transform-hmr',
                    imports: ['react'],
                    locals: ['module']
                  }
                ]
              }
            ]
          ]
        }
      },{
        test: /\.(sass|scss|css)$/,
        loaders: [
          'style-loader',
          'css-loader',
          'autoprefixer-loader',
          'sass-loader?indentedSyntax=scss&includePaths[]=' + path.join(__dirname, 'src') + '&includePaths[]=' + path.join(__dirname, 'node_modules')
        ]
      },{
				test: /\.(png|jpg|jpeg|gif)$/,
				loader: "url-loader?limit=10240"
			},{
				test: /\.(eot|woff2|woff|ttf|svg)$/,
				loader: "url-loader"
			}
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      '__DEV__': true,
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
}
