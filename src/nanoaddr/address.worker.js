/* @flow */

import * as nano from 'nanocurrency';
import * as protocol from './protocol';
import * as helpers from './helpers';

const BATCH_SIZE = 8000;
const SCORE_MIN = 3;

let running = false;
let count = 0;
let nextReport: number;

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

function search(terms: Array<string>): void {
  count += 1;

  const array = new Uint8Array(32);
  self.crypto.getRandomValues(array);
  const seed = array.reduce((hex, idx) => {
    return hex + ('0' + idx.toString(16)).slice(-2);
  }, '');

  const secretKey = nano.deriveSecretKey(seed, 0);
  const publicKey = nano.derivePublicKey(secretKey);
  const address = nano.deriveAddress(publicKey);

  const wallet = {
    seed,
    secretKey,
    publicKey,
    address,
  };

  const score = helpers.getScore(wallet, terms);
  if (score.value > SCORE_MIN) {
    reportMatch({ wallet, score });
  }
}

function startSearch(terms: Array<string>): void {
  setTimeout(() => {
    if (running) {
      for (let i = 0; i < BATCH_SIZE; i += 1) {
        search(terms);
        const now = Date.now();
        if (now > nextReport) {
          reportAPS(count);
          count = 0;
          nextReport = now + 1000;
        }
      }
      startSearch(terms);
    }
  }, 0);
}

onmessage = async (event) => {
  switch (event.data.type) {
    case 'start': {
      if (!running) {
        await nano.init();
        running = true;
        nextReport = Date.now() + 1000;
        startSearch(event.data.payload.terms);
      }
      break;
    }

    case 'stop': {
      running = false;
      break;
    }

    default: {
      throw new Error(`Unknown message ${String(event.data.type)}`);
    }
  }
}
