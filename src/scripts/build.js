/* @flow */

import path from 'path';
import * as fs from 'fs-extra';
import * as utils from 'scripts/utils';
import * as staticHelpers from 'scripts/staticHelpers';
import * as webpackHelpers from 'scripts/webpackHelpers';

export default async function build(): Promise<*> {
  try {
    const config = utils.getConfig();
    await fs.remove(config.paths.build);
    const clientStats = await webpackHelpers.buildProductionBundle(config);
    await staticHelpers.renderContent(config, clientStats);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
