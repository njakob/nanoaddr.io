/* @flow */

import * as React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';

const theme = {};

const applicationElement = document.createElement('div');
const documentBody = document.body;

if (documentBody) {
  documentBody.append(applicationElement);

  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,
    applicationElement,
  );
}
