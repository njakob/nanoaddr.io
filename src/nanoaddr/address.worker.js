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

function reportMatch(match: protocol.Match): void {
  // $FlowFixMe
  postMessage({
    type: 'match',
    payload: {
      match,
    },
  });
}

function search(text: string): void {
  count += 1;
  const arr = helpers.getSeedArray();
  self.crypto.getRandomValues(arr);
  const wallet = helpers.randomWallet(arr);
  const score = helpers.getScore(wallet, text);
  if (score > 0) {
    reportMatch({ wallet, score });
  }
}

function searchBatch(text: string): void {
  setTimeout(() => {
    if (running) {
      for (let i = 0; i < BATCH_SIZE; i += 1) {
        search(text);
      }
      searchBatch(text);
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
      if (!running) {
        running = true;
        searchBatch(event.data.payload.text);
      }
      break;
    }
    case 'stop': {
      running = false;
      break;
    }
  }
}
