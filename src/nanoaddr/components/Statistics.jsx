/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import FakeLink from 'nanoaddr/components/FakeLink';
import * as helpers from 'nanoaddr/helpers';

const Container = styled.div`
  padding: 32px 0;
  color: ${props => props.theme.colors.b0};
  display: flex;
  flex-direction: column;
`;

const Entry = styled.div`
  text-align: center;
`;

type Props = {
  stats: helpers.Stats;
};

function Statistics(props: Props) {
  return (
    <Container>
      <Entry>
        {props.stats.aps.toFixed(0)} <span title="Addresses per second">APS</span>
      </Entry>
      <Entry>
        {helpers.formatNumber(props.stats.addressesCount)} addreses tested
      </Entry>
    </Container>
  );
}

export default Statistics;
