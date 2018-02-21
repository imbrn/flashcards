const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: [
    "webpack-hot-middleware/client",
    "./src/app.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: "inline-source-map"
};
