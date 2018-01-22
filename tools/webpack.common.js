const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')

const config = require('./config')
const isProd = config.env === 'production'

const isCensor = process.env.CENSOR == 1

function getDir (path) {
  return resolve(process.cwd(), 'src', path)
}

module.exports = {
  output: {
    filename: '[name].js',

    path: resolve(process.cwd(), 'dist'),

    chunkFilename: '[name].chunk.js',

    publicPath: isProd ? isCensor ? `https://static.muscdn.com/ops/${ config.commitId }/censor/`: `https://static.muscdn.com/ops/${ config.commitId }/` : '/'
  },

  module: {
    rules: [
      {
        test: /\.(svg|cur)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.less'],
    alias: {
      components: getDir('components'),
      assets: getDir('assets'),
      routes: getDir('src', 'routes'),
      services: getDir('services'),
      utils: getDir('utils')
    }
  },

  node: {
    process: true
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: true
    }),

    new ForkTsCheckerWebpackPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(config.env),
      'process.env.DEVPROD': JSON.stringify(process.env.DEVPROD),
      'process.env.CENSOR': JSON.stringify(process.env.CENSOR),
      'process.env.TARGET_LANGUAGE': JSON.stringify(process.env.TARGET_LANGUAGE)
    }),

    new webpack.optimize.CommonsChunkPlugin({
      names: 'app',
      children: true,
      minChunks: ({ resource }) => {
        return /node_modules/.test(resource)
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      names: 'common',
      chunks: ['app', 'common'],
      minChunks: config.env !== 'production' ? Infinity :
        ({ resource }) => {
          return /node_modules/.test(resource)
        }
    }),

    new DuplicatePackageCheckerPlugin(),

    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
  ],
}
