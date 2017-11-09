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
        test: /\.css$/,
        use: extractCss.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { minimize: isProduction } }
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
    extensions: ['.js', '.json', '.jsx']
  }
}
