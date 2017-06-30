const path = require('path');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.config.js');

const srcFolder = path.resolve(__dirname, '../src');
const bundlesFolder = path.resolve(__dirname, '../bundles');

module.exports = merge(baseConfig, {
  entry: {
    dashboard: path.join(srcFolder, 'client/dashboard'),
    // admin: path.join(srcFolder, 'client/admin'),
  },

  output: {
    path: bundlesFolder,
    filename: '[name].js'
  },

  devtool: 'source-map'
});
