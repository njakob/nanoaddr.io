/* @flow */

import * as protocol from './protocol';
import * as helpers from './helpers';

const BATCH_SIZE = 100;

let running = false;
let count = 0;

function reportAPS(aps: number): void {
  // $FlowFixMe
  postMessage({
    type: 'aps',
    payload: {
      aps,
    },
  });
}

function reportAddress(addr: protocol.Address, score: number): void {
  // $FlowFixMe
  postMessage({
    type: 'addr',
    payload: {
      addr,
      score,
    },
  });
}

function search(): void {
  count += 1;
  const arr = helpers.getSeedArray();
  self.crypto.getRandomValues(arr);
  const addr = helpers.randomAddress(arr);
  const score = helpers.getScore(addr);
  if (score > 0) {
    reportAddress(addr, score);
  }
}

function searchBatch(): void {
  setTimeout(() => {
    if (running) {
      for (let i = 0; i < BATCH_SIZE; i += 1) {
        search();
      }
      searchBatch();
    }
  }, 0);
}

setInterval(() => {
  reportAPS(count);
  count = 0;
}, 1000);

onmessage = (event) => {
  switch (event.data.type) {
    case 'start': {
      running = true;
      searchBatch();
      break;
    }
    case 'stop': {
      running = false;
      break;
    }
  }
}
