const path = require('path');

const srcFolder = path.resolve(__dirname, '../src');
const distFolder = path.resolve(__dirname, '../dist');

module.exports = {
  entry: {
    server: srcFolder
  },

  output: {
    path: distFolder,
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
    modules: ['node_modules'],
    alias: {
      'handlebars': 'handlebars/dist/handlebars.js'
    }
  },

  devtool: 'source-map',

 target: 'node'
}
