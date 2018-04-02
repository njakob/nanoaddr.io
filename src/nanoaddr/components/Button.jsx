/* @flow */

import styled, { css } from 'styled-components';

export default styled.button`
  font-family: Noto Sans;
  color: ${props => props.theme.colors.b0};
  border: 0;
  border-radius: 2px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
  line-height: 28px;
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.2);

  ${props => !props.disabled && css`
    cursor: pointer;
    background: ${props.theme.colors.b1};
  `}
  ${props => props.disabled && css`
    background: ${props.theme.colors.g1};
  `}

  ${props => props.small && css`
    padding: 6px 12px;
  `}
  ${props => props.medium && css`
    padding: 12px;
  `}
`;
