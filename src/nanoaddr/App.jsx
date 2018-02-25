/* @flow */

import * as React from 'react';
import { injectGlobal } from 'styled-components';
import styled from 'styled-components';
import * as protocol from './protocol';
import * as helpers from './helpers';
import AddressWorker from './address.worker';
import Button from './components/Button';

const Wrapper = styled.div`
  height: 100vh;
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
  color: ${props => props.theme.colors.b0};
`;

const ButtonContainer = styled.div`
  padding: 32px 60px;
`;

const WalletList = styled.div`
  padding: 32px 60px;
`;

const Wallet = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.b0};
`;

const Address = styled.code`
  padding: 6px;
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
  matches: Array<protocol.Match>;
};

class App extends React.Component<Props, State> {
  worker: Worker;

  state = {
    running: false,
    matches: [],
  };

  componentWillMount() {
    injectGlobal`
      @import url('https://fonts.googleapis.com/css?family=Noto+Sans');
      @import url('https://fonts.googleapis.com/css?family=Noto+Mono');

      body {
        font-family: Noto Sans;
      }

      body, div, p {
        padding: 0;
        margin: 0;
      }
    `
  }

  componentDidMount() {
    // $FlowFixMe
    this.worker = new AddressWorker();
    this.worker.onmessage = this.handleWorkerMessage;
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
              ...prevState,
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

  handleClick = () => {
    this.worker.postMessage({
      type: this.state.running ? 'stop' : 'start',
    });
    this.setState({ running: !this.state.running });
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
            <Button onClick={this.handleClick}>
              {this.state.running ? 'Generate' : 'Stop'}
            </Button>
          </ButtonContainer>
          <WalletList>
            {this.state.matches.map((match) => (
              <Wallet key={match.wallet.address}>
                <Address>{match.wallet.address}</Address>
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
