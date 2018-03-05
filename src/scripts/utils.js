/* @flow */

import path from 'path';
import * as fs from 'fs-extra';
import * as parcel from '@njakob/parcel';

export type Env = 'production' | 'development';

export type Config = {
  version: string;
  publicPath: string;
  paths: {
    sources: string;
    nodeModules: string;
    build: string;
    package: string;
  };
};

export function getConfig(): Config {
  const rootPath = path.resolve(process.cwd());
  const resolvePath = relativePath => path.resolve(path.join(rootPath, relativePath));

  const paths = {
    root: rootPath,
    sources: resolvePath('src'),
    nodeModules: resolvePath('node_modules'),
    build: resolvePath('build'),
    package: resolvePath('package.json'),
  };

  const pkg = parcel.parseParcel(JSON.parse(fs.readFileSync(paths.package, 'utf-8')));
  const { version } = pkg;

  if (!version) {
    throw new Error('Invalid version in package.json');
  }

  return {
    paths,
    version,
    publicPath: '/',
  };
}
