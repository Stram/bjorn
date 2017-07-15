const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const baseConfig = require('./webpack.base.config.js');

const srcFolder = path.resolve(__dirname, '../src');
const distFolder = path.resolve(__dirname, '../dist/server-renderer-bundles');

module.exports = merge(baseConfig, {
  entry: {
    app: path.resolve(srcFolder, 'server-entry')
  },

  output: {
    path: distFolder,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  devtool: 'source-map',

  target: 'node',

  externals: nodeExternals({
    // do not externalize dependencies that need to be processed by webpack.
    // you can add more file types here e.g. raw *.vue files
    // you should also whitelist deps that modifies `global` (e.g. polyfills)
    whitelist: [/\.css$/]
  }),

  plugins: [
    new VueSSRServerPlugin()
  ]
});
