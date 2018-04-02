/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import Address from 'nanoaddr/components/Address';

const DONATION_ADDR = 'xrb_3njakob6iz67oi5cfade3etoremah35wsdei6n6qnjrdhrjgj45kwhqotc85';
const DONATION_ADDR_HIGHLIGHTS = [{ idx: 5, term: 'njakob' }];

const Container = styled.div`
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Text = styled.div`
  max-width: 500px;
  text-align: center;
  color: ${props => props.theme.colors.b0};
`;

const AddressContainer = styled.div`
  padding: 16px 0;
  width: 100%;
  text-align: center;
`;

type Props = {
  onShowAddress: (address: string) => void;
};

function Donation(props: Props) {
  return (
    <Container>
      <Text>
        <p>You found your perfect address? You can buy me a beer or share this amazing piece of tech.</p>
      </Text>
      <AddressContainer>
        <Address
          value={DONATION_ADDR}
          highlights={DONATION_ADDR_HIGHLIGHTS}
          onClick={() => props.onShowAddress(DONATION_ADDR)}
        />
      </AddressContainer>
    </Container>
  );
}

export default Donation;
