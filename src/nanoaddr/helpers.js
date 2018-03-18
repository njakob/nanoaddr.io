/* @flow */

import * as React from 'react';
import * as protocol from './protocol';

export type Stats = {
  aps: number;
  addressesCount: number;
  ignoredMatchesCount: number;
};

export function as<T>(value: mixed, type: Class<T>): T {
  if (value instanceof type) {
    return value;
  }

  // $FlowFixMe
  const typeName = type.name;
  throw new Error();
}

export function getScore(wallet: protocol.Wallet, regexp: RegExp): protocol.Score {
  const { address } = wallet;
  const truncated = address.substring(5);
  const locations = [];
  let score = 0;
  let match = null;
  while (match = regexp.exec(truncated)) {
    const idx = 5 + match.index;
    const term = match[0];
    score += term.length;
    locations.push({ term, idx });
  }
  return { value: score, locations };
}

export function sortMatches(matches: Array<protocol.Match>): Array<protocol.Match> {
  const copy = matches.slice(0);
  copy.sort((a, b) => b.score.value - a.score.value);
  return copy;
}

export function getHardwareConcurrency(): number {
  return window.navigator.hardwareConcurrency || 1;
}

export function downloadContent(content: string, filename: string): void {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';

  const body = document.body;
  if (body) {
    body.appendChild(element);
    element.click();
    body.removeChild(element);
  }
}

export function copyClipboard(content: string): void {
  const textarea = document.createElement('textarea');
  textarea.setAttribute('type', 'hidden');
  textarea.textContent = content;
  const body = document.body;
  if (body) {
    body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }
}

let numberFormatter = new Intl.NumberFormat();
export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

export function createRegExp(terms: Array<string>): RegExp {
  const processedTerms = terms.filter((term) => {
    return term.length <= 100 && /[a-zA-Z?.]/.test(term);
  }).map((term) => {
    return term.toLowerCase();
  });
  return new RegExp(`(^(${terms.join('|')}))|((${terms.join('|')})$)`, 'g');
}
