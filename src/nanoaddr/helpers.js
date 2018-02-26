/* @flow */

import * as React from 'react';
import nano from 'nano-lib';
import * as protocol from './protocol';

const ADDR_LENGTH = 64;

export function as<T>(value: mixed, type: Class<T>): T {
  if (value instanceof type) {
    return value;
  }

  // $FlowFixMe
  const typeName = type.name;
  throw new Error();
}

export function getSeedArray(): Uint8Array {
  return new Uint8Array(32);
}

export function randomWallet(arr: Uint8Array): protocol.Wallet {
  return nano.address.fromSeed(arr, 0);
}

export function getScore(wallet: protocol.Wallet, text: string): number {
  const index = wallet.address.indexOf(text);
  if (index === -1) {
    return 0;
  }
  return ADDR_LENGTH - index;
}

export function sortMatches(matches: Array<protocol.Match>): Array<protocol.Match> {
  const copy = matches.slice(0);
  copy.sort((a, b) => b.score - a.score);
  return copy;
}

export function getComplexity(text: string): number {
  return text.length * text.length;
}

export function getHardwareConcurrency(): number {
  return window.navigator.hardwareConcurrency || 1;
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
