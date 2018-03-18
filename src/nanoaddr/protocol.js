/* @flow */

export type Wallet = {
  seed: string;
  secretKey: string;
  publicKey: string;
  address: string;
};

export type Location = {
  idx: number;
  term: string;
};

export type Score = {
  value: number;
  locations: Array<Location>;
};

export type Match = {
  wallet: Wallet;
  score: Score;
};

/**
 * Application Message Protocol
 */

export type MatchAppMessage = {
  type: 'match';
  payload: {
    match: Match;
  };
};

export type StatsAppMessage = {
  type: 'stats';
  payload: {
    addresses: number;
    ignoredMatches: number;
  };
};

export type AppMessage =
  | MatchAppMessage
  | StatsAppMessage
  ;

export type AppMessageEvent = MessageEvent & {
  data: AppMessage;
}

/**
 * Worker Message Protocol
 */

export type StartWorkerMessage = {
  type: 'start';
  payload: {
    terms: Array<string>;
  };
};

export type StopWorkerMessage = {
  type: 'stop';
};

export type WorkerMessage =
  | StartWorkerMessage
  | StopWorkerMessage
  ;
