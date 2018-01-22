const path = require('path')
const webpackTestConfig = require('./webpack.test')

module.exports = function (config) {
  config.set({
    basePath: path.join(__dirname, '../'),

    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      './tools/spec-bundle.js'
    ],

    preprocessors: {
      './tools/spec-bundle.js': [
        'webpack'
      ]
    },

    autoWatch: false,

    singleRun: true,

    webpack: webpackTestConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    reporters: [ 'mocha' ],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    browsers: [ process.env.BROWSER || 'Chrome_without_sandbox' ],

    captureTimeout: 60000,

    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-chrome-launcher',
      'karma-mocha-reporter',
      'karma-webpack',
      'karma-sourcemap-loader'
    ],

    customLaunchers: {
      Chrome_without_sandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox'
        ]
      }
    }
  })
}
