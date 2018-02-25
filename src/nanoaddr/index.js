/* @flow */

import * as React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';

const theme = {
  colors: {
    b0: '#fff',
    b1: '#4a90e2',
    b2: '#0f1121',
    g1: '#a0a0a0',
  },
};

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
