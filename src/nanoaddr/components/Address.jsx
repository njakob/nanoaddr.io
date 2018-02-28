/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';
import * as helpers from 'nanoaddr/helpers';

const Container = styled.code`
  font-size: 16px;
  color: ${props => props.theme.colors.b0};

  ${props => props.onClick && css`
    cursor: pointer;
  `}
`

type Props = {
  value: string;
  onClick: MouseEventHandler;
}

export default function Address(props: Props) {
  function handleClick(evt: MouseEvent) {
    helpers.copyClipboard(props.value);
    props.onClick(evt);
  }

  return (
    <Container onClick={handleClick}>
      {props.value}
    </Container>
  );
}
