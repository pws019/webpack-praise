const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const HtmlWebpackReplacePlugin = require('../webpack_plugin/html-webpack-replace-plugin.js');

module.exports = {
  entry: {
    service: ['./src/public/scripts/service.es'],
    index: ['./src/public/scripts/praiseButton.es']
  },
  output:{
    filename: 'scripts/[name].[hash:5].js',
    path: path.join(__dirname, '../','build/public'),
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.es$/,
      exclude:/(node_modules|bower_componets)/,
      use: {
        loader:'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    },{ test: /\.css$/, use:ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: "css-loader"
    }) }]
  },
  plugins: [
    new CleanWebpackPlugin([
      'build/public',
    ],{
      root: path.join(__dirname, '../'),
      allowExternal: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: '/scripts/common/common.[hash:5].js'
    }),
    new ExtractTextPlugin('css/[name].[contenthash:5].css'),
    new HtmlWebpackReplacePlugin(), 
    new HtmlWebpackPlugin({
      filename: '../views/index.html',
      template: './src/views/index.html',
      chunks:['common','service','index'],
      chunksSortMode: "manual",
    }),
    new CopyWebpackPlugin([{ from: './src/views/layout.html', to: '../views/layout.html' }]),
    new CopyWebpackPlugin([{ from: './src/public/lib', to: 'lib' }]),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      }
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ],
  externals:['xtag']
}