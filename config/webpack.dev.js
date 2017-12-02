const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const paths = require('./paths.js');
const devServerConfig = require('./devServerConfig.js');

module.exports = merge(common, {

  devtool: 'inline-source-map',
  devServer: devServerConfig,

  plugins: [
    new webpack.DefinePlugin({
      DEVELOPMENT: JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]

});
