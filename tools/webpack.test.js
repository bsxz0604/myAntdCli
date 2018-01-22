const webpack = require('webpack')
const path = require('path')
const webpackCommonConfig = require('./webpack.common')

module.exports = {

  devtool: 'inline-cheap-module-source-map',

  entry: path.join(process.cwd(), './tools/spec-bundle'),

  resolve: {
    extensions: webpackCommonConfig.resolve.extensions,

    alias: webpackCommonConfig.resolve.alias
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        query: {
          transpileOnly: true
        }
      },
      {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader?modules&camelCase', 'less-loader']
      },
      {
        test: /\.raw/,
        loaders: [ 'raw-loader' ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"test"'
    })
  ],

  externals: {
    'react/addons': true,
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true
  }
}
