const merge = require('webpack-merge')
const webpack = require('webpack')
const { resolve } = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin')

const webpackConfig = require('./webpack.common')
// const theme = require('./theme.config')
const config = require('./config')

const ExtraLib = new ExtractTextPlugin({
  filename: 'lib.css'
})
const ExtraApp = new ExtractTextPlugin({
  filename: 'app.css',
  allChunks: true
})

module.exports = merge(webpackConfig, {
  entry: {
    app: './src/index.js'
  },

  module: {
    rules: [
      {
        test: /\.(ts|js|jsx|tsx)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          happyPackMode: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                style: true
              })
            ]
          }),
        },
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ExtraApp.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true,
                minimize: true
              }
            },
            'postcss-loader',
            `less-loader`
          ]
        }),
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ExtraLib.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?minimize',
            'postcss-loader',
            `less-loader`
          ]
        }),
        exclude: path => {
          return !/node_modules/.test(path)
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },

  plugins: [
    ExtraLib,
    ExtraApp,

    new webpack.HashedModuleIdsPlugin(),

    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        screw_ie8: true
      },
      compress: {
        screw_ie8: true,
        dead_code: true,
        warnings: false
      },
      beautify: false,
      sourceMap: false,
      comments: false
    }),
  ]
})
