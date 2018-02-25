const path = require('path');
const childProcess = require('child_process');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sourcesPath = path.join(process.cwd(), 'src');
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
const buildPath = path.join(process.cwd(), 'build');

module.exports = {
  devtool: 'source-map',

  entry: [
    path.join(sourcesPath, 'nanoaddr'),
  ],

  output: {
    path: buildPath,
    filename: '[name].bundle.js',
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
