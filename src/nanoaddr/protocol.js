/* @flow */

export type Wallet = {
  secret: string;
  address: string;
};

export type Match = {
  wallet: Wallet;
  score: number;
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

export type APSAppMessage = {
  type: 'aps';
  payload: {
    aps: number;
  };
};

export type AppMessage =
  | MatchAppMessage
  | APSAppMessage
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
    text: string;
  };
};

export type StopWorkerMessage = {
  type: 'stop';
};

export type WorkerMessage =
  | StartWorkerMessage
  | StopWorkerMessage
  ;