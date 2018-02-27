const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const parcel = require('@njakob/parcel');

const sourcesPath = path.join(process.cwd(), 'src');
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
const buildPath = path.join(process.cwd(), 'build');
const pkg = parcel.parseParcel(JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')), 'utf-8'));

module.exports = {
  devtool: 'source-map',

  entry: [
    path.join(sourcesPath, 'nanoaddr'),
  ],

  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      nodeModulesPath,
    ],
  },

  node: {
    fs: 'empty',
  },

  module: {
    rules: [
      {
        test: /worker\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'worker-loader',
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({ title: 'Nano Addr' }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __VERSION__: JSON.stringify(pkg.version),
      __DEV__: true,
    }),
  ],

  devServer: {
    hot: true,
    contentBase: buildPath,
    stats: {
      colors: true,
      chunks: false,
      children: false,
    },
  },
};
