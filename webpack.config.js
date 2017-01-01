const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, './src'),
  entry: {
    js: './index.js',
    html: './index.html',
    vendor: [
      'mo-js'
    ],
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.css'],
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        include: /src/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.js$/,
        include: /src/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?sourceMap!postcss-loader'
        ),
      }
    ],
  },
  postcss: [
    require('autoprefixer')
  ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }}),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CopyWebpackPlugin([ {from: './CNAME', to: './CNAME', toType: 'file'} ])
  ],
  devServer: {
    contentBase: './src',
    stats: { colors: true },
  },
};
