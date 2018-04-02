/* @flow */

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import * as utils from 'scripts/utils';

function getWebpackConfig(config: utils.Config, env: utils.Env): Object {
  switch (env) {
    case 'development':
      // eslint-disable-next-line global-require
      return require('./configs/development').default(config);
    case 'production':
      // eslint-disable-next-line global-require
      return require('./configs/production').default(config);
    default:
      throw new Error('Invalid environment');
  }
}

function getCompiler(config: utils.Config, env: utils.Env): Object {
  return webpack(getWebpackConfig(config, env));
}

export function startDevelopmentServer(config: utils.Config): Promise<*> {
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || 'localhost';

  const devServerConfig = {
    hot: true,
    disableHostCheck: true,
    contentBase: config.paths.build,
    publicPath: config.publicPath,
    historyApiFallback: true,
    compress: false,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  };

  const devCompiler = getCompiler(config, 'development');
  const devServer = new WebpackDevServer(devCompiler, devServerConfig);

  return new Promise((resolve, reject) => {
    devServer.listen(port, host, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

export function buildProductionBundle(config: utils.Config): Promise<Object> {
  return new Promise((resolve, reject) => {
    const prodCompiler = getCompiler(config, 'production');
    prodCompiler.run((err, stats) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(stats.toJson());
    });
  });
}
