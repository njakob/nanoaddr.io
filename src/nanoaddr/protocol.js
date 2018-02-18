/* @flow */

export type Address = {
  secret: string;
  address: string;
};

/**
 * Application Message Protocol
 */

export type AddressAppMessage = {
  type: 'addr';
  payload: {
    addr: Address;
    score: number;
  };
};

export type APSAppMessage = {
  type: 'aps';
  payload: {
    aps: number;
  };
};

export type AppMessage =
  | AddressAppMessage
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
};

export type StopWorkerMessage = {
  type: 'stop';
};

export type WorkerMessage =
  | StartWorkerMessage
  | StopWorkerMessage
  ;
