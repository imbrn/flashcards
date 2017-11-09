const path = require('path');
const paths = require('./paths.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Variables
const isProduction = process.env.NODE_ENV === 'production'

const extractCss = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: !isProduction
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: paths.build,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: [ 'transform-object-rest-spread' ]
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: extractCss.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { minimize: isProduction, importLoaders: 1 } },
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
    extractCss,
    new HtmlWebpackPlugin({
      template: path.resolve(paths.public, 'index.html')
    })
  ],
  resolve: {
    modules: [ 'node_modules' ],
    extensions: ['.js', '.json', '.jsx']
  }
}
