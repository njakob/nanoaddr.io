/* @flow */

import * as React from 'react';
import * as protocol from './protocol';

export function as<T>(value: mixed, type: Class<T>): T {
  if (value instanceof type) {
    return value;
  }

  // $FlowFixMe
  const typeName = type.name;
  throw new Error();
}

export function getScore(wallet: protocol.Wallet, terms: Array<string>): number {
  let score = 0;
  let { address } = wallet;
  const truncated = address.substring(5);
  terms.forEach((term) => {
    if (truncated.startsWith(term) || truncated.endsWith(term)) {
      score += term.length;
    }
  });
  return score;
}

export function sortMatches(matches: Array<protocol.Match>): Array<protocol.Match> {
  const copy = matches.slice(0);
  copy.sort((a, b) => b.score - a.score);
  return copy;
}

export function getComplexity(text: string): number {
  return text.length * text.length;
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
