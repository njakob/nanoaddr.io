/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import FakeLink from 'nanoaddr/components/FakeLink';

const Container = styled.div`
  padding: 16px 0;
  color: ${props => props.theme.colors.g1};
  user-select: none;
`

const Header = styled.div`
  text-align: center;
`

const Content = styled.div`
  padding: 16px 0;
`

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
            Disclaimer: Nanoaddr.io takes no responsibility for the use of generated content provided by this website.
          </Content>
        )}
      </Container>
    );
  }
}

export default Disclaimer;
