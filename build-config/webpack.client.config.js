const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

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

  devtool: 'source-map',

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new VueSSRClientPlugin()
  ]
});
