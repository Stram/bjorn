const path = require('path');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.config.js');

const srcFolder = path.resolve(__dirname, '../src');
const distFolder = path.resolve(__dirname, '../dist');

module.exports = merge(baseConfig, {
  entry: {
    server: srcFolder
  },

  output: {
    path: distFolder,
    filename: '[name].js'
  },

  resolve: {
    alias: {
      'handlebars': 'handlebars/dist/handlebars.js'
    }
  },

  devtool: 'source-map',

  target: 'node'
});
