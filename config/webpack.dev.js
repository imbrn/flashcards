const webpack = require('webpack');
const paths = require('./paths.js');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    historyApiFallback: true,
  },
  module: {
    rules: [ 
      {
        test: /\.m(odule)?\.(css|scss)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          { loader: 'style-loader', },
          { loader: 'css-loader', options: { importLoaders: 1, modules: true } },
          { loader: 'postcss-loader', options: { config: { path: paths.config } } },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(css|scss)$/,
        exclude: /(node_modules|bower_components|(\.m(odule)?\.(css|scss)$))/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1, } },
          { loader: 'postcss-loader', options: { config: { path: paths.config } } },
          { loader: 'sass-loader' }
        ]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      DEVELOPMENT: JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
});
