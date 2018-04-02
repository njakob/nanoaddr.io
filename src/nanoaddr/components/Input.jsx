/* @flow */

import styled from 'styled-components';

export default styled.input`
  background: transparent;
  border: 0;
  border-bottom: 1px solid white;
  font-size: 20px;
  color: ${props => props.theme.colors.b0};

  &::-webkit-input-placeholder {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.4);
  }
  &::-moz-placeholder {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.4);
  }
  &:-ms-input-placeholder {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.4);
  }
  &:-moz-placeholder {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.4);
  }
`;
