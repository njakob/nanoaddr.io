/* @flow */

import * as React from 'react';
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

export default function Root() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}
