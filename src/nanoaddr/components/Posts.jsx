/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';
import Link from 'nanoaddr/components/Link';

const articles = [
  {
    title: 'What is Nano?',
    content: (
      <p><Link href="https://nano.org">Nano</Link> is a cryptocurrency that provides in instant, feeless transactions. Nano has been previously know as RaiBlocks.</p>
    ),
  },
  {
    title: 'Why Nano?',
    content: (
      <p>Nano has no transaction fees. This particularity makes it perfect for small payouts</p>
    ),
  },
  {
    title: 'Is NanoAddr.io safe?',
    content: (
      <p>Nothing on the Internet is totally safe. We strongly recommend to run the search while being offline and in private mode.</p>
    ),
  },
  {
    title: 'How the seed is randomly generated?',
    content: (
      <p>We use a generator provided by the browser directly which creates cryptographically strong random values. <code><Link href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues" rel="nofollow">Crypto.getRandomValues</Link></code></p>
    ),
  },
];

const Container = styled.div`
  padding: 32px 0;
`;

const Article = styled.div`
  padding: 12px 0;
`;

const Title = styled.h2`
  margin: 0;
  padding: 6px 0;
  font-size: 26px;
  color: ${props => props.theme.colors.b0};
`;

const Content = styled.div`
  color: ${props => props.theme.colors.b0};
`;

function Posts() {
  return (
    <Container>
      {articles.map((article) => (
        <Article key={article.title}>
          <Title>{article.title}</Title>
          <Content>
            {article.content}
          </Content>
        </Article>
      ))}
    </Container>
  );
}

export default Posts;
