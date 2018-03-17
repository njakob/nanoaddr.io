/* @flow */

import * as React from 'react';
import Donation from './components/Donation';
import Disclaimer from './components/Disclaimer';
import Version from './components/Version';

type Props = {
  onShowAddress: (address: string) => void;
};

function Footer(props: Props) {
  return (
    <footer>
      <Donation onShowAddress={props.onShowAddress} />
      <Disclaimer />
      <Version />
    </footer>
  );
}

export default Footer;
