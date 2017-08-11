const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const baseConfig = require('./webpack.base.config.js');

const resolve = (pathName) => path.resolve(__dirname, pathName);

const srcFolder = resolve('../src');

const isTest = process.env.NODE_ENV === 'test';

const config = merge(baseConfig, {
  entry: {
    app: './src/index.ts',
  },

  devtool: 'source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    contentBase: resolve('../public'),
    compress: true,
    port: 6978,
    hot: true,
    open: true,
    historyApiFallback: true,
  }
});

if (!isTest) {
  config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity
  }));
}

module.exports = config;
