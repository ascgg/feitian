/* eslint no-var: 0 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
require('babel-polyfill');

module.exports = {
  devtool: 'source-map',
  target: 'electron',
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', 'src/renderer'],
    alias: {
      "ag-grid-root": __dirname + "/node_modules/ag-grid"
    }
  },
  entry: {
    app: './src/renderer/entry.jsx',
    vendorCommon: [
      'jquery',
      'lodash',
    ],
    vendorCommonReact: [
      'react',
      'react-dom',
      'react-router'
    ]
  },
  output: {
    path: path.join(__dirname, 'build', 'static'),
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
      {
        test: /\.s?css$/,
        loaders: [
          'style',
          'css',
          'autoprefixer?browsers=last 2 version',
          'sass?includePaths[]=' + path.resolve(__dirname, 'node_modules'),
        ],
      },
      {
        test: /\.png$/,
        loader: 'url?mimetype=image/png',
      },
      {
        test: /\.(?:eot|ttf|woff2?|svg)$/,
        loader: 'file?name=fonts/[name]-[hash:6].[ext]',
      },
      {
        test: /\.json?$/,
        loader: 'json',
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendorCommon',
      filename: 'vendor-common.bundle.js',
      children: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendorCommonReact',
      filename: 'vendor-common-react.bundle.js',
      children: true,
    }),
    new HtmlWebpackPlugin({
      template: 'src/renderer/index.html',
    }),
    new webpack.ProvidePlugin({
      Radium: 'radium',
      jQuery: 'jquery',
      $: 'jquery',
      _: 'lodash',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.NoErrorsPlugin(),
  ],
};

