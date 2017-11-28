const path = require('path');
const paths = require('./paths.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cleanOptions = {
  root: paths.root
};

module.exports = {

  entry: {
    app: path.join(paths.src, 'index.js')
  },

  output: {
    filename: '[name].js',
    path: paths.build,
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ 'env', 'react' ],
            plugins: [
              'transform-class-properties',
              'transform-object-rest-spread',
            ]
          }
        }
      },
      {
        test: /\.(png|svg|jpg|git)$/,
        use: [
          'file-loader'
        ],
      },
    ]
  },

  plugins: [
    new CleanWebpackPlugin([paths.build], cleanOptions),
    new HtmlWebpackPlugin({
      title: 'es-boilerplate',
      template: path.join(paths.public, 'index.html')
    })
  ],

  resolve: {
    modules: [ 'node_modules' ],
    extensions: [ '.js', '.jsx', '.json' ],
  }

};
