/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import FakeLink from 'nanoaddr/components/FakeLink';

const Container = styled.div`
  padding: 16px 0;
  max-width: 800px;
  color: ${props => props.theme.colors.g1};
  user-select: none;
`;

const Header = styled.div`
  text-align: center;
`;

const Content = styled.div`
  padding: 16px 0;
  text-align: center;
`;

type State = {
  shown: boolean;
};

class Disclaimer extends React.Component<{}, State> {
  state = {
    shown: false,
  };

  handleLinkClick = () => {
    this.setState({
      shown: !this.state.shown,
    });
  }

  render() {
    return (
      <Container>
        <Header>
          By using this generator you agree to our <FakeLink onClick={this.handleLinkClick}>Disclaimer</FakeLink>
        </Header>
        {this.state.shown && (
          <Content>
            {/* eslint-disable-next-line max-len */}
            Nanoaddr.io does not provide any warranty for the displayed content and will not be held responsible should the use of the provided content result in any loss or damages.
          </Content>
        )}
      </Container>
    );
  }
}

export default Disclaimer;
