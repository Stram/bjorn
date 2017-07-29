const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const resolve = (pathName) => path.resolve(__dirname, pathName);

const srcFolder = resolve('../src');
const bundlesFolder = resolve('../bundles');

const styleLoader = {
  use: [{
    loader: 'css-loader'
  }, {
    loader: 'sass-loader',
    options: {
      includePaths: [
        resolve('../src/apps'),
        resolve('../src/apps/styles')
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
        appendTsSuffixTo: [/\.vue$/],
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          scss: ExtractTextPlugin.extract(styleLoader),
          ts: 'ts-loader',
        },
        cssModules: {
          camelCase: true
        }
      }
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(styleLoader)
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
    path: resolve('../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },

  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    modules: [
      resolve('../src'),
      'node_modules'
    ],
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new FriendlyErrorsPlugin(),
  ]
}
