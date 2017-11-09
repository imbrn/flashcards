const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const paths = require('./paths.js');

module.exports = merge(common, {
  plugins: [
    new CleanWebpackPlugin([ paths.build ], {
      root: paths.root
    }),
    new UglifyJsPlugin()
  ]
});
