/* @flow */

import styled, { css } from 'styled-components';

export default styled.button`
  background: ${props => props.theme.colors.b1};
  color: ${props => props.theme.colors.b0};
  border: 0;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;

  ${props => props.small && css`
    padding: 6px 12px;
  `}

  ${props => props.medium && css`
    padding: 12px;
  `}
`;
