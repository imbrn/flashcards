const webpack = require('webpack');
const paths = require('./paths.js');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCss = new ExtractTextPlugin({
  filename: '[name].[contenthash].css'
});

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        exclude: /(node_modules|bower_components)/,
        use: extractCss.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader',
              options: {
                minimize: true,
                importLoaders: 1,
              }
            },
            { loader: 'postcss-loader',
              options: {
                config: { path: paths.config }
              }
            },
            { loader: 'sass-loader' }
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CleanWebpackPlugin([ paths.build ], {
      root: paths.root
    }),
    extractCss,
    new UglifyJsPlugin(),
  ]
});
