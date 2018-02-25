const path = require('path');
const childProcess = require('child_process');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');

const sourcesPath = path.join(process.cwd(), 'src');
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
const buildPath = path.join(process.cwd(), 'build');

module.exports = {
  devtool: 'source-map',

  entry: {
    app: [
      path.join(sourcesPath, 'nanoaddr'),
    ],
    vendors: [
     'react',
     'react-dom',
     'styled-components',
   ],
  },

  output: {
    path: buildPath,
    filename: '[name].[chunkhash].js',
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
    }),
    new HtmlWebpackPlugin({ title: 'Nano Addr' }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: false,
    }),
    new UglifyJSWebpackPlugin(),
  ],
};
