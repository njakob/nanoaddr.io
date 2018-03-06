/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import FakeLink from 'nanoaddr/components/FakeLink';

const Container = styled.div`
  padding: 16px 0;
  background: white;
  text-align: center;
  color: black;
`

type State = {
  offline: boolean;
};

class Offline extends React.Component<{}, State> {
  state = {
    offline: false,
  };

  handleOnlineStatus = () => {
    this.setState({
      offline: !navigator.onLine,
    });
  }

  componentWillMount() {
    if (__BROWSER__) {
      window.addEventListener('online', this.handleOnlineStatus);
      window.addEventListener('offline', this.handleOnlineStatus);
    }
  }

  componentWillUnmount() {
    if (__BROWSER__) {
      window.removeEventListener('online', this.handleOnlineStatus);
      window.removeEventListener('offline', this.handleOnlineStatus);
    }
  }

  render() {
    return this.state.offline && (
      <Container>
        You are now offline, its safer to generate your seed
      </Container>
    );
  }
}

export default Offline;
