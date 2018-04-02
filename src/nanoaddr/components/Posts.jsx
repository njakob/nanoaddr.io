/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import Link from 'nanoaddr/components/Link';

const URL_NANO = 'https://nano.org';
const URL_NANO_WALLET = 'https://nanowallet.io';
const URL_NANO_VAULT = 'http://www.nanovault.io';
const URL_NANO_MINER = 'https://nano-miner.com/?908l';
const URL_NANO_FAUCET = 'https://www.nanofaucet.org';
const URL_BINANCE = 'https://www.binance.com/?ref=20233638';

const URL_GET_RANDOM_VALUES = 'https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues';

const articles = [
  {
    title: 'What is Nano?',
    content: (
      // eslint-disable-next-line max-len
      <p><Link href={URL_NANO}>Nano</Link> (XRB) is a cryptocurrency that provides in instant, feeless transactions. Nano has been previously know as RaiBlocks.</p>
    ),
  },
  {
    title: 'Why Nano?',
    content: (
      <p>Nano has no transaction fees. This particularity makes it perfect for small payouts.</p>
    ),
  },
  {
    title: 'Is NanoAddr safe?',
    content: (
      // eslint-disable-next-line max-len
      <p>Nothing on the Internet is totally safe. We strongly recommend to run the search while being offline and in private mode.</p>
    ),
  },
  {
    title: 'How the seed is randomly generated?',
    content: (
      <p>We use a generator provided by the browser directly which creates cryptographically strong random values. <code><Link href={URL_GET_RANDOM_VALUES} rel="nofollow">Crypto.getRandomValues</Link></code></p>
    ),
  },
  {
    title: 'How can I get some Nano?',
    content: (
      <React.Fragment>
        <p><Link href={URL_BINANCE}>Binance.com</Link> is one exchange where you would be able to buy Nano.</p>
        {/* eslint-disable-next-line max-len */}
        <p>If you want just to play around, you can use <Link href={URL_NANO_MINER}>nano-miner.com</Link> or <Link href={URL_NANO_FAUCET}>nanofaucet.org</Link>.</p>
      </React.Fragment>
    ),
  },
  {
    title: 'Where can I get a wallet?',
    content: (
      // eslint-disable-next-line max-len
      <p>You can use <Link href={URL_NANO_WALLET}>nanowallet.io</Link> or <Link href={URL_NANO_VAULT}>nanovault.io</Link> as wallets and import the seeds you are finding on NanoAddr.</p>
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
      {articles.map(article => (
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
