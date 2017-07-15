const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const srcFolder = path.resolve(__dirname, '../src');
const bundlesFolder = path.resolve(__dirname, '../bundles');

const styleLoader = {
  use: [{
    loader: 'css-loader'
  }, {
    loader: 'sass-loader',
    options: {
      includePaths: [
        path.resolve(__dirname, '../src/apps')
      ]
    }
  }],
  fallback: 'vue-style-loader'
};

module.exports = {
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/]
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          scss: ExtractTextPlugin.extract(styleLoader),
          ts: 'ts-loader'
        },
        cssModules: {
          camelCase: true
        }
      }
    }, {
      test: /\.html$/,
      loader: 'html-loader',
      options: {
        removeComments: false,
        exportAsEs6Default: true
      }
    }]
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },

  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    modules: [
      path.resolve(__dirname, '../src'),
      'node_modules'
    ],
    alias: {
      app: path.resolve(__dirname, '../src/app')
    }
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new FriendlyErrorsPlugin(),
  ]
}
