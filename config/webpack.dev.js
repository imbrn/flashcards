const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const paths = require('./paths.js');
const devServerConfig = require('./devServerConfig.js');

module.exports = merge(common, {

  devtool: 'inline-source-map',
  devServer: devServerConfig,

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: paths.config,
              },
            },
          },
        ],
      }
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      DEVELOPMENT: JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]

});
