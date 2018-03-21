/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';
import * as protocol from 'nanoaddr/protocol';
import * as helpers from 'nanoaddr/helpers';

const Container = styled.code`
  font-size: 16px;
  overflow-wrap: break-word;
  color: ${props => props.theme.colors.b0};

  ${props => props.onClick && css`
    cursor: pointer;
  `}
`
const Highlight = styled.span`
  color: ${props => props.theme.colors.b1};
`

type Props = {
  value: string;
  highlights?: ?Array<protocol.Location>;
  onClick: MouseEventHandler;
}

export default function Address(props: Props) {
  const {
    value,
    highlights,
    onClick,
  } = props;

  function handleClick(evt: MouseEvent) {
    helpers.copyClipboard(value);
    props.onClick(evt);
  }

  function renderText() {
    if (!highlights || highlights.length === 0) {
      return value;
    }

    const sortedHighlights = highlights.slice(0);
    sortedHighlights.sort((a, b) => a.idx - b.idx);

    const elements = [];
    let last = 0;
    for (let i = 0; i < sortedHighlights.length; i += 1) {
      const highlight = sortedHighlights[i];
      const { idx, term } = highlight;
      const { length } = term;
      elements.push(value.substring(last, idx));
      elements.push(<Highlight key={`${idx}_${term}`}>{value.substr(idx, length)}</Highlight>);
      last = idx + length;
    }
    elements.push(value.substr(last, value.length));

    return elements;
  }

  return (
    <Container onClick={handleClick}>
      {renderText()}
    </Container>
  );
}
