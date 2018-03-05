/* @flow */

import path from 'path';
import * as fs from 'fs-extra';
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import Helmet from 'react-helmet';
import * as utils from 'scripts/utils';

export function renderContent(config: utils.Config, clientStats: Object): Promise<*> {
  const chunkNames = [];

  global.__BROWSER__ = false;
  global.__DEV__ = false;
  global.__VERSION__ = config.version;

  const App = require('nanoaddr/index').default;

  const sheet = new ServerStyleSheet();
  const applicationHtml = ReactDOMServer.renderToString(sheet.collectStyles(<App />));
  const styleTags = sheet.getStyleElement();

  const helmet = Helmet.renderStatic();
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  const scripts = [
    clientStats.assetsByChunkName['vendors'],
    clientStats.assetsByChunkName['app'],
  ];

  const Document = () => (
    <html lang="en" {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
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
        <div id="root" dangerouslySetInnerHTML={{ __html: applicationHtml }} />
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

  let html = `<!DOCTYPE html>${ReactDOMServer.renderToString(<Document />)}`;

  return fs.outputFile(path.join(config.paths.build, 'index.html'), html);
}
