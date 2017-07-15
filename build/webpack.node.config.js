const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals')

const baseConfig = require('./webpack.base.config.js');

const srcFolder = path.resolve(__dirname, '../src');
const distFolder = path.resolve(__dirname, '../dist');

module.exports = merge(baseConfig, {
  entry: {
    server: srcFolder
  },

  output: {
    path: distFolder,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  devtool: 'source-map',

  target: 'node',

  externals: nodeExternals({
    whitelist: /\.css$/
  }),

  node: {
    __dirname: false,
    __filename: false,
  }
});
