/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import Donation from './components/Donation';
import Disclaimer from './components/Disclaimer';
import Version from './components/Version';

const Container = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

type Props = {
  onShowAddress: (address: string) => void;
};

function Footer(props: Props) {
  return (
    <Container>
      <Donation onShowAddress={props.onShowAddress} />
      <Disclaimer />
      <Version />
    </Container>
  );
}

export default Footer;
