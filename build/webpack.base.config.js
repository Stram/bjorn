const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const resolve = (pathName) => path.resolve(__dirname, pathName);

const styleLoader = {
  use: [{
    loader: 'css-loader'
  }, {
    loader: 'sass-loader',
    options: {
      includePaths: [
        resolve('../src/styles')
      ]
    }
  }],
  fallback: 'vue-style-loader'
};

module.exports = {
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          scss: ExtractTextPlugin.extract(styleLoader)
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
    }, {
      test: /\.svg$/,
      loader: 'raw-loader'
    }]
  },

  output: {
    path: resolve('../dist'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.js', '.vue'],
    modules: [
      resolve('../src'),
      'node_modules'
    ],
    alias: {
      app: resolve('../src')
    }
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new FriendlyErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.NamedModulesPlugin()
  ]
}
