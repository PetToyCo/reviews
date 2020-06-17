const path = require('path');
const { pathToFileURL } = require('url');

module.exports = {
  mode: 'production',
  entry: {
    service: {import: path.resolve(__dirname, 'client', 'src', 'service.jsx'), filename: path.resolve('client', 'public', 'bundle.js'),},
    test: {import: path.resolve(__dirname, 'test', 'tests', 'test.js'), filename: path.resolve('test', 'bundle.js'),},
  },
  output: {
    path: path.resolve(__dirname),
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
