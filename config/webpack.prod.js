const paths = require('./paths.js');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCss = new ExtractTextPlugin('styles.css');

module.exports = merge(common, {

  module: {
    rules: [

      {
        test: /\.css$/,
        use: extractCss.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                config: { path: paths.config }
              }
            }
          ],
        })
      },

      {
        test: /\.scss$/,
        use: {
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                config: { path: paths.config }
              }
            },
            'sass-loader'
          ]
        }
      }

    ]
  },

  plugins: [
    extractCss,
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new UglifyJsPlugin({
      sourceMap: true
    }),
  ]

});
