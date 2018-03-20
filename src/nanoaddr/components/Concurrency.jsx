/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import FakeLink from 'nanoaddr/components/FakeLink';
import * as helpers from 'nanoaddr/helpers';
import Button from 'nanoaddr/components/Button';

const Container = styled.div`
  padding: 32px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Label = styled.div`
  padding: 0 6px;
  color: ${props => props.theme.colors.b0};
`;

const Entry = styled.div`
  padding: 0 6px;
  color: ${props => props.theme.colors.b0};
`;

type Props = {
  currentFactor: number;
  onFactorChange: (factor: number) => void;
};

function Concurrency(props: Props) {
  return (
    <Container>
      <Label>Speed</Label>
      {[0.25, 0.5, 1].map((factor) => (
        <Entry key={String(factor)}>
          <Button disabled={factor === props.currentFactor} onClick={() => props.onFactorChange(factor)}>
            {Math.floor(factor * 100)}%
          </Button>
        </Entry>
      ))}
    </Container>
  );
}

export default Concurrency;
