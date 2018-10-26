var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
require('babel-polyfill');

/*
var nodeModules = {};
fs.readdirSync('node_modules').filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
}).forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
}); */

module.exports = {
  debug: true,
  devtool: 'eval-source-map',
  target: 'electron',
  entry: {
    app: [
      'webpack/hot/dev-server',
      './src/renderer/entry.jsx'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js",
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.s?css$/,
        loaders: [
          'style',
          'css',
          'autoprefixer',
          'sass?includePaths[]=' + path.resolve(__dirname, 'node_modules')
        ]
      },
      {
        test: /\.js$|\.jsx$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.png$/,
        loader: "url?mimetype=image/png"
      },
      {
        test: /\.(?:eot|ttf|woff2?|svg)$/,
        loader: "file?name=[path][name]-[hash:6].[ext]&context=assets"
      }
    ]
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', 'src/renderer'],
    alias: {
      "ag-grid-root": __dirname + "/node_modules/ag-grid"
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hot: true,
      template: 'src/renderer/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    }),
    new webpack.ContextReplacementPlugin(/bindings$/, /^$/)
  ],
  externals: ['bindings']
};
