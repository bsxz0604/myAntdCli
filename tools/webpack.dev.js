const os = require('os')
const merge = require('webpack-merge')
const { resolve } = require('path')
const HappyPack = require('happypack')
const webpack = require('webpack')
const { DllBundlesPlugin } = require('webpack-dll-bundles-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const _ = require('lodash')

const pkg = require('../package.json')
const common = require('./webpack.common')
const theme = require('./theme.config')
const config = require('./config')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const devConfig = {
  entry: {
    app: './src/index.js',
    common: [
      'antd/dist/antd.less',
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${ config.port }`,
      'webpack/hot/only-dev-server'
    ],
  },

  devtool: 'cheap-module-source-map',

  devServer: {
    hot: true,
    contentBase: resolve(process.cwd(), 'dist'),
    publicPath: '/',
    port: config.port,
    disableHostCheck: true,
    proxy: {
      '/rest/ops': {
        target: config.apiHost,
        changeOrigin: true,
        logLevel: 'debug',
        secure: false
      },
      '/rest/':{
        target: config.censorHost,
        changeOrigin: true,
        logLevel: 'debug',
        secure: false
      },
    }
  },

  module: {
    rules: [
      {
        test: /\.(ts|js|jsx|tsx)$/,
        use: [
          'happypack/loader?id=ts'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loaders: [
          'happypack/loader?id=sourcemap'
        ],
        enforce: 'pre'
      },
      {
        test: /\.css$/,
        loaders: [
          'happypack/loader?id=css'
        ]
      },
      {
        test: /\.less$/,
        loaders: [
          'happypack/loader?id=less'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        loaders: [
          'happypack/loader?id=libless'
        ]
      },
    ]
  },

  plugins: [
    new HappyPack({
      id: 'ts',
      loaders: [
        'react-hot-loader/webpack',
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            happyPackMode: true
          }
        }
      ],
      threadPool: happyThreadPool
    }),

    new HappyPack({
      id: 'css',
      loaders: [ 'style-loader?sourcemap', 'css-loader?sourcemap', 'postcss-loader?sourcemap'],
      threadPool: happyThreadPool
    }),

    new HappyPack({
      id: 'less',
      loaders: [
        'style-loader?sourcemap',
        'css-loader?modules&sourcemap&camelCase',
        'postcss-loader?sourcemap',
        {
          loader: 'less-loader',
          options: {
            sourcemap: true,
            modifyVars: theme
          }
        }
      ],
      threadPool: happyThreadPool
    }),

    new HappyPack({
      id: 'libless',
      loaders: [
        'style-loader?sourcemap',
        'css-loader?sourcemap',
        'postcss-loader?sourcemap',
        {
          loader: 'less-loader',
          options: {
            sourcemap: true,
            modifyVars: theme
          }
        }
      ],
      threadPool: happyThreadPool
    }),

    new HappyPack({
      id: 'sourcemap',
      loaders: [ 'source-map-loader' ],
      threadPool: happyThreadPool
    }),

    new webpack.NamedModulesPlugin(),
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    new webpack.optimize.OccurrenceOrderPlugin(),

    new AddAssetHtmlPlugin([
      { filepath: resolve(process.cwd(), '.dll/vendor.dll.js') },
    ]),

    new HardSourceWebpackPlugin({
      cacheDirectory: resolve(process.cwd(), '.cache/hard-source/[confighash]'),
      recordsPath: resolve(process.cwd(), '.cache/hard-source/[confighash]/records.json'),
      configHash: (webpackConfig) => {
        return require('node-object-hash')({sort: false}).hash(webpackConfig);
      },
      environmentHash: function() {
        // Return a string or a promise resolving to a string of a hash of the
        return new Promise((resolve, reject) => {
          require('fs').readFile(resolve(process.cwd(), 'yarn.lock'), (err, src) => {
            if (err) return reject(err)
            resolve(
              require('crypto').createHash('md5').update(src).digest('hex')
            )
          })
        })
      },
    }),
  ]
}

devConfig.plugins.push(new DllBundlesPlugin({
  bundles: {
    vendor: _.chain(pkg.dependencies)
      .omit('querystring')
      .keys()
      .value()
    },
  ignorePackageError: true,
  dllDir: resolve(process.cwd(), '.dll'),
  webpackConfig: merge(devConfig, {
    devtool: 'cheap-module-source-map',
    plugins: []
  })
}))

module.exports = merge(common, devConfig)
