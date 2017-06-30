const path = require('path');

const srcFolder = path.resolve(__dirname, '../src');
const bundlesFolder = path.resolve(__dirname, '../bundles');

module.exports = {
  entry: {
    dashboard: path.join(srcFolder, 'client/dashboard'),
    // admin: path.join(srcFolder, 'client/admin'),
  },

  output: {
    path: bundlesFolder,
    filename: '[name].js'
  },

  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'ts-loader'
    }]
  },

  resolve: {
    extensions: ['.js', '.ts'],
    modules: ['node_modules']
  },

  devtool: 'source-map'
}
