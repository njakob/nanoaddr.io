/* @flow */

import * as React from 'react';
import nano from 'nano-lib';
import * as protocol from './protocol';

const ADDR_LENGTH = 64;

export function getSeedArray(): Uint8Array {
  return new Uint8Array(32);
}

export function randomAddress(arr: Uint8Array): protocol.Address {
  return nano.address.fromSeed(arr, 0);
}

export function getScore(addr: protocol.Address): number {
  const index = addr.address.indexOf('aaa');
  if (index === -1) {
    return 0;
  }
  return ADDR_LENGTH - index;
}
