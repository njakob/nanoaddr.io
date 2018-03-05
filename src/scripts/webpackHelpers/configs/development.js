/* @flow */

import path from 'path';
import * as fs from 'fs-extra';
import childProcess from 'child_process';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as parcel from '@njakob/parcel';
import * as utils from 'scripts/utils';

export default (config: utils.Config) => {
  return {
    devtool: 'source-map',

    entry: [
      path.join(config.paths.sources, 'nanoaddr'),
    ],

    output: {
      path: config.paths.build,
      filename: 'bundle.js',
      publicPath: '/',
    },

    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [
        config.paths.nodeModules,
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
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
      }),
      new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(config.version),
        __BROWSER__: true,
        __DEV__: true,
      }),
    ],
  }
}
