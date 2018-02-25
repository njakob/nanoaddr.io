/* @flow */

import * as React from 'react';
import nano from 'nano-lib';
import * as protocol from './protocol';

const ADDR_LENGTH = 64;

export function getSeedArray(): Uint8Array {
  return new Uint8Array(32);
}

export function randomWallet(arr: Uint8Array): protocol.Wallet {
  return nano.address.fromSeed(arr, 0);
}

export function getScore(wallet: protocol.Wallet): number {
  const index = wallet.address.indexOf('aaa');
  if (index === -1) {
    return 0;
  }
  return ADDR_LENGTH - index;
}

export function downloadContent(content: string, filename: string): void {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';

  const body = document.body;
  if (body) {
    body.appendChild(element);
    element.click();
    body.removeChild(element);
  }
}
