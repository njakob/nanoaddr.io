/* @flow */

import * as React from 'react';
import * as protocol from './protocol';
import * as helpers from './helpers';
import AddressWorker from './address.worker';

type Props = {};

type State = {
  running: boolean;
};

class App extends React.Component<Props, State> {
  worker: Worker;

  state = {
    running: false,
  };

  componentDidMount() {
    // $FlowFixMe
    this.worker = new AddressWorker();
    this.worker.postMessage('b');
    this.worker.onmessage = this.handleWorkerMessage;
  }

  handleWorkerMessage = (event: MessageEvent) => {
    const { data } = event;
    if (data && typeof data === 'object') {
      const appMessage = ((data: any): protocol.AppMessage);
      switch (appMessage.type) {
        case 'addr': {
          const { addr, score } = appMessage.payload;
          console.log(addr, score);
          break;
        }
        case 'aps': {
          break;
        }
        default: {
          throw new Error(`Unknown message ${String(appMessage.type)}`);
        }
      }
    }
  }

  handleClick = () => {
    this.worker.postMessage({
      type: this.state.running ? 'stop' : 'start',
    });
    this.setState({ running: !this.state.running });
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        {this.state.running ? 'Stop' : 'Start'}
      </div>
    );
  }
}

export default App;
