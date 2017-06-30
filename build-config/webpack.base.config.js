const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    }]
  },

  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    modules: ['node_modules']
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
  ]
}
