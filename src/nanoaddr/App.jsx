/* @flow */

import * as React from 'react';
import { Helmet } from 'react-helmet';
import Main from './Main';

export default function App() {
  return (
    <React.Fragment>
      <Helmet>
        <title>NanoAddr - Vanity Nano address generator in your browser</title>
        <link rel="canonical" href="https://nanoaddr.io/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Nicolas Jakob" />
        <meta name="description" content="NanoAddr is a vanity address generator for the cryptocurrency Nano that works offline in your browser" />
        <meta property="og:title" content="NanoAddr - Find your personalized Nano address" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nanoaddr.io/" />
        <meta property="og:site_name" content="NanoAddr" />
        <meta property="og:description" content="NanoAddr is a vanity address generator for the cryptocurrency Nano that works offline in your browser" />
      </Helmet>
      <Main />
    </React.Fragment>
  );
}
