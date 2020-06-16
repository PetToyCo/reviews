var path = require('path');

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "client", "src", "service.jsx"),
  output: {
    path: path.resolve(__dirname, "client", "public"),
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: babel-loader,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-env"]
        }
      },
      {
        test: /\.js?$/,
        loader: babel-loader,
        options: {
          presets: ["@babel/preset-env"]
        }
      }
    ]
  }
}