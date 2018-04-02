/* @flow */

import path from 'path';
import * as fs from 'fs-extra';
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import Helmet from 'react-helmet';
import * as utils from 'scripts/utils';

export function renderContent(config: utils.Config, clientStats: Object): Promise<*> {
  /* eslint-disable no-underscore-dangle */
  global.__BROWSER__ = false;
  global.__DEV__ = false;
  global.__VERSION__ = config.version;
  /* eslint-enable no-underscore-dangle */

  // eslint-disable-next-line global-require
  const App = require('nanoaddr/index').default;

  const sheet = new ServerStyleSheet();
  const applicationHtml = ReactDOMServer.renderToString(sheet.collectStyles(<App />));
  const styleTags = sheet.getStyleElement();

  const helmet = Helmet.renderStatic();
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  const scripts = [
    clientStats.assetsByChunkName.vendors,
    clientStats.assetsByChunkName.app,
  ];

  const manifestAssets = clientStats.assets.filter(({ name }) => /^manifest\./.test(name));
  const iconAssets = clientStats.assets.filter(({ name }) => /^icon_/.test(name));

  const links = [];

  if (manifestAssets.length > 0) {
    links.push({
      rel: 'manifest',
      href: path.join('/', manifestAssets[0].name),
    });
  }

  iconAssets.forEach((asset) => {
    const [, sizes] = /^icon_(\d+x\d+)/.exec(asset.name);
    links.push({
      rel: 'icon',
      type: 'image/png',
      sizes,
      href: path.join('/', asset.name),
    });
  });

  const Document = () => (
    <html lang="en" {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {links.map(link => (
          <link key={link.href} {...link} />
        ))}
        {scripts.map(script => (
          <link
            key={script}
            rel="preload"
            as="script"
            href={`${config.publicPath}${script}`}
          />
        ))}
        {styleTags}
      </head>
      <body {...bodyAttrs}>
        {/* eslint-disable react/no-danger */}
        <div id="root" dangerouslySetInnerHTML={{ __html: applicationHtml }} />
        {/* eslint-enable react/no-danger */}
        {scripts.map(script => (
          <script
            key={script}
            defer
            type="text/javascript"
            src={`${config.publicPath}${script}`}
          />
        ))}
      </body>
    </html>
  );

  const html = `<!DOCTYPE html>${ReactDOMServer.renderToString(<Document />)}`;

  return fs.outputFile(path.join(config.paths.build, 'index.html'), html);
}
