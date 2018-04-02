/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import Link from 'nanoaddr/components/Link';

const NANOADDR_REPO_URL = 'https://github.com/njakob/nanoaddr';
const NANOCURRENCY_REPO_URL = 'https://github.com/marvinroger/nanocurrency-js';

const Container = styled.div`
  padding: 16px 0;
  text-align: center;
  color: ${props => props.theme.colors.b1};
`;

function Version() {
  return (
    <Container>
      {/* eslint-disable-next-line max-len */}
      <Link href={NANOADDR_REPO_URL}>Nano Addr</Link> v{__VERSION__} | Made with <Link href={NANOCURRENCY_REPO_URL}>nanocurrency-js</Link>
    </Container>
  );
}

export default Version;
