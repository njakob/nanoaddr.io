/* @flow */

import * as nano from 'nanocurrency';
import * as protocol from './protocol';
import * as helpers from './helpers';

const BATCH_SIZE = 8000;
const SCORE_MIN = 3;

let running = false;
let currentAddressesCount = 0;
let nextReport = 0;

function reportStats(addresses: number): void {
  // $FlowFixMe
  postMessage({
    type: 'stats',
    payload: {
      addresses,
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
  currentAddressesCount += 1;

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
          reportStats(currentAddressesCount);
          currentAddressesCount = 0;
          nextReport = now + 1000;
        }
      }
      startSearch(terms);
    }
  }, 0);
}

onmessage = async (event: MessageEvent) => {
  const { data } = event;
  if (data && typeof data === 'object') {
    const message = ((data: any): protocol.WorkerMessage);
    switch (message.type) {
      case 'start': {
        if (!running) {
          await nano.init();
          running = true;
          nextReport = Date.now() + 1000;
          startSearch(message.payload.terms);
        }
        break;
      }

      case 'stop': {
        running = false;
        break;
      }

      default: {
        throw new Error(`Unknown message ${String(message.type)}`);
      }
    }
  }
}
