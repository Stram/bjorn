const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const baseConfig = require('./webpack.base.config.js');

const srcFolder = path.resolve(__dirname, '../src');

module.exports = merge(baseConfig, {
  entry: {
    app: './src/client-entry.ts',
  },

  devtool: 'source-map',

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"',
    }),
    new VueSSRClientPlugin(),
  ]
});
