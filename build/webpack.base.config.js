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

  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    modules: [
      path.resolve(__dirname, '../src'),
      'node_modules'
    ],
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    // new FriendlyErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
  ]
}
