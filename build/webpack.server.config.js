const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const baseConfig = require('./webpack.base.config.js');

const srcFolder = path.resolve(__dirname, '../src');
const distFolder = path.resolve(__dirname, '../dist');

module.exports = merge(baseConfig, {
  entry: path.resolve(srcFolder, 'server-entry.ts'),

  output: {
    path: distFolder,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  devtool: '#source-map',

  target: 'node',

  externals: nodeExternals({
    whitelist: /\.css$/
  }),

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"',
    }),
    new VueSSRServerPlugin()
  ],

  node: {
    __dirname: false,
    __filename: false,
  }
});
