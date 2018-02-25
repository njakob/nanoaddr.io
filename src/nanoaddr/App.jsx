/* @flow */

import * as React from 'react';
import { injectGlobal } from 'styled-components';
import styled from 'styled-components';
import * as protocol from './protocol';
import * as helpers from './helpers';
import AddressWorker from './address.worker';
import Button from './components/Button';
import Input from './components/Input';

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.b2};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 100px;
`;

const Title = styled.h1`
  margin: 0;
  padding: 6px 0;
  font-size: 32px;
  color: ${props => props.theme.colors.b0};
`;

const Meta = styled.p`
  margin: 0;
  padding: 6px 0;
  font-size: 20px;
  color: ${props => props.theme.colors.b0};
`;

const Description = styled.div`
  padding: 32px 60px;
  font-size: 16px;
  text-align: center;
  color: ${props => props.theme.colors.b0};
`;

const ButtonContainer = styled.div`
  padding: 32px 60px;
`;

const WalletList = styled.div`
  padding: 32px 60px;
`;

const Wallet = styled.div`
  display: flex;
  font-size: 12px;
  padding: 6px 0;
  color: ${props => props.theme.colors.b0};
`;

const WalletColumn = styled.div`
  display: flex;
  align-items: center;
  padding: 0 6px;
`;

const Address = styled.code`
  font-size: 16px;
`

const Donation = styled.div`
  padding: 32px 60px;
  text-align: center;
  color: ${props => props.theme.colors.b0};
`

type Props = {};

type State = {
  running: boolean;
  text: string;
  matches: Array<protocol.Match>;
};

class App extends React.Component<Props, State> {
  workers: Array<Worker> = [];

  state = {
    running: false,
    text: '',
    matches: [],
  };

  componentWillMount() {
    injectGlobal`
      @import url('https://fonts.googleapis.com/css?family=Noto+Sans');

      body {
        font-family: Noto Sans;
      }

      body, div, p, h1, h2 {
        padding: 0;
        margin: 0;
      }
    `
  }

  componentDidMount() {
    const cores = helpers.getHardwareConcurrency();
    for (let i = 0; i < cores; i += 1) {
      // $FlowFixMe
      const worker: Worker = new AddressWorker();
      worker.onmessage = this.handleWorkerMessage;
      this.workers.push(worker);
    }
  }

  postMessage(message: protocol.WorkerMessage) {
    this.workers.forEach(worker => worker.postMessage(message));
  }

  handleWorkerMessage = (event: MessageEvent) => {
    const { data } = event;
    if (data && typeof data === 'object') {
      const appMessage = ((data: any): protocol.AppMessage);
      switch (appMessage.type) {
        case 'match': {
          const { match } = appMessage.payload;
          this.setState((prevState) => {
            const sortedMatches = [
              ...prevState.matches,
              match,
            ].sort();
            return {
              matches: sortedMatches,
            };
          });
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

  handleTextChange = (event: Event) => {
    const inputElement = helpers.as(event.target, HTMLInputElement);
    this.setState({
      text: inputElement.value,
    });
  }

  handleClick = () => {
    const {
      running,
      text,
    } = this.state;

    const newRunningState = !running;

    if (newRunningState) {
      this.postMessage({
        type: 'start',
        payload: {
          text,
        },
      });
    } else {
      this.postMessage({
        type: 'stop',
      });
    }

    this.setState({
      running: newRunningState,
    });
  }

  handleDownload = (match: protocol.Match) => {
    helpers.downloadContent(JSON.stringify({
      addr: match.wallet.address,
      key: match.wallet.secret,
    }), `${match.wallet.address}.json`);
  }

  render() {
    return (
      <Wrapper>
        <Container>
          <Title>Nano Addr</Title>
          <Meta>Find your perfect Nano address</Meta>
          <Description>
            <p>Kinda risky to generate your private key within a browser right? If you feel your secret might be stolen, simply let the system do its work offline!</p>
          </Description>
          <ButtonContainer>
            <Input
              type="text"
              placeholder="Text"
              value={this.state.text}
              onChange={this.handleTextChange}
            />
            <Button medium onClick={this.handleClick}>
              {this.state.running ? 'Stop' : 'Generate'}
            </Button>
          </ButtonContainer>
          <WalletList>
            {this.state.matches.map((match) => (
              <Wallet key={match.wallet.address}>
                <WalletColumn>
                  <Address>{match.wallet.address}</Address>
                </WalletColumn>
                <WalletColumn>
                  <Button small onClick={() => this.handleDownload(match)}>
                    Download
                  </Button>
                </WalletColumn>
              </Wallet>
            ))}
          </WalletList>
          <Donation>
            <p>You found your perfect address?</p>
            <p>You can buy me a beer or share this amazing piece of tech.</p>
          </Donation>
        </Container>
      </Wrapper>
    );
  }
}

export default App;
