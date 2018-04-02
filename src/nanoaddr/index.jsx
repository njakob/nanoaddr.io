/* @flow */

import * as React from 'react';
// $FlowFixMe: https://github.com/facebook/flow/issues/5035
import { hydrate, render } from 'react-dom';
import Root from './Root';

if (__BROWSER__) {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    hydrate(<Root />, rootElement);
  }
}
if (__DEV__) {
  const rootElement = document.createElement('div');
  const documentBody = document.body;
  if (documentBody) {
    documentBody.append(rootElement);
  }
  render(<Root />, rootElement);
}

export default Root;
