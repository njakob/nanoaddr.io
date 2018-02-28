/* @flow */

import * as React from 'react';
import { injectGlobal } from 'styled-components';
import styled from 'styled-components';
import * as protocol from './protocol';
import * as helpers from './helpers';
import AddressWorker from './address.worker';
import Button from './components/Button';
import Input from './components/Input';

const REPO_URL = 'https://github.com/njakob/nanoaddr';
const DONATION_ADDR = 'xrb_3njakob6iz67oi5cfade3etoremah35wsdei6n6qnjrdhrjgj45kwhqotc85';
const SAMPLES_COUNT = 3;

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${props => props.theme.colors.b2};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 100px;
  flex: 1 1;
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
  max-width: 500px;
  color: ${props => props.theme.colors.b0};
`;

const ButtonContainer = styled.div`
  padding: 32px 0;
`;

const Statistics = styled.div`
  padding: 32px 0;
  color: ${props => props.theme.colors.b0};
`;

const WalletList = styled.div`
  padding: 32px 0;
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
  color: ${props => props.theme.colors.b0};
`

const Donation = styled.div`
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const DonationText = styled.div`
  max-width: 500px;
  text-align: center;
  color: ${props => props.theme.colors.b0};
`

const Version = styled.div`
  padding: 32px 0;
  text-align: center;
  color: ${props => props.theme.colors.b1};
`

const Link = styled.a`
  color: ${props => props.theme.colors.b1};
`

type Props = {};

type State = {
  running: boolean;
  text: string;
  matches: Array<protocol.Match>;
  aps: number;
  total: number;
};

class App extends React.Component<Props, State> {
  workers: Array<Worker> = [];
  interval: ?IntervalID = null;
  samples: Array<number> = [0];

  state = {
    running: false,
    text: '',
    matches: [],
    aps: 0,
    total: 0,
  };

  componentWillMount() {
    injectGlobal`
      @import url('https://fonts.googleapis.com/css?family=Noto+Sans');

      body {
        font-family: Noto Sans;
        overflow-y: scroll;
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
          this.setState(({
            matches: helpers.sortMatches([
              ...this.state.matches,
              appMessage.payload.match,
            ]),
          }));
          break;
        }
        case 'aps': {
          this.samples[0] += appMessage.payload.aps;
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
          terms: text.split(' '),
        },
      });
      this.interval = setInterval(() => {
        const sample = this.samples.reduce((acc, value) => acc + value, 0);
        this.samples.unshift(0);
        this.samples.splice(SAMPLES_COUNT);
        this.setState({
          aps: sample / SAMPLES_COUNT,
        });
      }, 1000);
      this.setState({
        running: newRunningState,
      });
    } else {
      this.postMessage({
        type: 'stop',
      });
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
      this.samples = [0];
      this.setState({
        running: newRunningState,
        aps: 0,
      });
    }
  }

  handleDownload = (match: protocol.Match) => {
    helpers.downloadContent(JSON.stringify(match.wallet), `${match.wallet.address}.json`);
  }

  renderAddress(address: string) {
    return (
      <Address>{address}</Address>
    );
  }

  render() {
    return (
      <Wrapper>
        <Container>
          <Title>Nano Addr</Title>
          <Meta>Find your perfect Nano address</Meta>
          <Description>
            <p>Kinda risky to generate your private key within a browser, right? If you feel your secret might be stolen, simply let the system do its work offline!</p>
          </Description>
          <ButtonContainer>
            <Input
              type="text"
              placeholder="Text"
              value={this.state.text}
              onChange={this.handleTextChange}
            />
            <Button medium disabled={helpers.getComplexity(this.state.text) < 9} onClick={this.handleClick}>
              {this.state.running ? 'Stop' : 'Generate'}
            </Button>
          </ButtonContainer>
          <Statistics>
            {this.state.aps.toFixed(0)} APS
          </Statistics>
          <WalletList>
            {this.state.matches.map((match) => (
              <Wallet key={match.wallet.address}>
                <WalletColumn>
                  {this.renderAddress(match.wallet.address)}
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
            <DonationText>
              <p>You found your perfect address? You can buy me a beer or share this amazing piece of tech.</p>
            </DonationText>
            <Address>{DONATION_ADDR}</Address>
          </Donation>
          <Version>
            <Link href={REPO_URL}>Nano Addr</Link> v{__VERSION__}
          </Version>
        </Container>
      </Wrapper>
    );
  }
}

export default App;
