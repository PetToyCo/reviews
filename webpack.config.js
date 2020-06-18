const path = require('path');

module.exports = {
  // mode: 'production',
  mode: 'development',
  entry: {
    './client/public/app.js': path.resolve(__dirname, 'client', 'src', 'service.jsx'),
    './test/bundle.js': path.resolve(__dirname, 'test', 'tests', 'index.jsx'),
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
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        },
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
};
