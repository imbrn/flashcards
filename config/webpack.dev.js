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
        test: /\.m(odule)?\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: { path: paths.config }
            }
          },
        ],
      },

      {
        test: /\.m(odule)?\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: { path: paths.config }
            }
          },
          'sass-loader',
        ],
      },

      {
        test: /\.css$/,
        exclude: /\.m(odule)?\.css$/,
        use: [
          'style-loader', 'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: { path: paths.config }
            }
          },
        ],
      },

      {
        test: /\.scss$/,
        exclude: /\.m(odule)?\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: { path: paths.config }
            },
          },
          'sass-loader',
        ],
      }

    ]
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
