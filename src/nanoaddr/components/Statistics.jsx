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
      {props.stats.estimatedDuration > helpers.MS_S * 5 && (
        <Entry>
          It might take {helpers.formatDurationEstimation(props.stats.estimatedDuration)} to find an address!
        </Entry>
      )}
      <Entry>
        {helpers.formatNumber(props.stats.addressesCount)} {helpers.plural(props.stats.addressesCount, 'address', 'addresses')} tested
      </Entry>
    </Container>
  );
}

export default Statistics;
