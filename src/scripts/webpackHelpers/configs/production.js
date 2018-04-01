/* @flow */

import path from 'path';
import * as fs from 'fs-extra';
import childProcess from 'child_process';
import webpack from 'webpack';
import UglifyJSWebpackPlugin from 'uglifyjs-webpack-plugin';
import WebpackPWAManifest from 'webpack-pwa-manifest';
import RobotstxtWebpackPlugin from 'robotstxt-webpack-plugin';
import * as parcel from '@njakob/parcel';
import * as utils from 'scripts/utils';

export default (config: utils.Config) => {
  return {
    devtool: 'source-map',

    entry: {
      app: [
        path.join(config.paths.sources, 'nanoaddr'),
      ],
      vendors: [
        'react',
        'react-dom',
        'styled-components',
     ],
    },

    output: {
      path: config.paths.build,
      filename: '[name].[chunkhash].js',
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
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
      }),
      new WebpackPWAManifest({
        name: 'NanoAddr.io - Nano address generator',
        short_name: 'NanoAddr.io',
        description: 'Vanity Nano address generator in your browser',
        background_color: '#ffffff',
        fingerprints: true,
        inject: false,
        ios: false,
        start_url: '/index.html',
        icons: [
          {
            src: path.join(config.paths.sources, 'nanoaddr/assets/favicon.png'),
            sizes: [96, 128, 192, 256],
          },
        ],
      }),
      new RobotstxtWebpackPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'production',
      }),
      new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(config.version),
        __BROWSER__: true,
        __DEV__: false,
      }),
      new UglifyJSWebpackPlugin(),
    ],
  };
}
