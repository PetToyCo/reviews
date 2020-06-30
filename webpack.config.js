const path = require('path');

module.exports = {
  // mode: 'production',
  mode: 'development',
  entry: {
    './client/public/app.js': path.resolve(__dirname, 'client', 'src', 'index.jsx'),
    './test/bundle.js': path.resolve(__dirname, 'test', 'tests', 'index.jsx'),
    './test/bundleServerTests.js': path.resolve(__dirname, 'test', 'tests', 'indexServerTests.jsx'),
  },
  output: {
    path: path.resolve(__dirname),
    filename: '[name]',
  },
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        },
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
};
