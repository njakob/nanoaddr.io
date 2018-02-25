/* @flow */

import styled from 'styled-components';

export default styled.button`
  background: ${props => props.theme.colors.b1};
  color: ${props => props.theme.colors.b0};
  border: 0;
  padding: 12px;
  font-weight: bold;
`;
