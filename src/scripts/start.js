/* @flow */

import * as utils from 'scripts/utils';
import * as webpackHelpers from 'scripts/webpackHelpers';

export default async function start(): Promise<*> {
  try {
    const config = utils.getConfig();
    await webpackHelpers.startDevelopmentServer(config);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  }
}
