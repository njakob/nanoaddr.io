/* @flow */

import * as React from 'react';
import namedNumber from 'hsimp-named-number';
import namedNumberDictionary from 'hsimp-named-number/named-number-dictionary.json';
import * as protocol from './protocol';

namedNumber.setDictionary(namedNumberDictionary);

export type Stats = {
  aps: number;
  estimatedDuration: number;
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

export function sanitizeTerms(terms: Array<string>): Array<string> {
  return terms.filter((term) => {
    return term.length <= 100 && /[a-zA-Z?.]/.test(term);
  });
}

export function createRegExp(terms: Array<string>): RegExp {
  const processedTerms = terms.map((term) => {
    return term.toLowerCase();
  });
  return new RegExp(`(^(${terms.join('|')}))|((${terms.join('|')})$)`, 'g');
}

export function getMinSearchIterations(terms: Array<string>): number {
  const minimalTerms = terms.map((term) => term.replace(/[.?]/, '').length);
  minimalTerms.sort();
  const shortestTerm = minimalTerms[0];
  return Math.pow(32, shortestTerm) / 2;
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

export const MS_S = 1000;
export const MS_M = MS_S * 60;
export const MS_H = MS_M * 60;
export const MS_D = MS_H * 24;
export const MS_W = MS_D * 7;
export const MS_Y = MS_D * 365.25;

export function plural(n: number, text1: string, textn: string): string {
  return n > 1 ? textn : text1;
}

function formatDurationWord(ms: number, ref: number, word1: string, wordn: string): string {
  const value = Math.round(ms / ref);
  return `${value} ${plural(value, word1, wordn)}`;
}

export function formatDurationEstimation(ms: number): string {
  if (ms >= MS_Y * 1000) {
    const name = namedNumber(Math.round(ms / MS_Y));
    return `${name.getName()} years`;
  }
  if (ms >= MS_Y) {
    return formatDurationWord(ms, MS_Y, 'year', 'years');
  }
  if (ms >= MS_W) {
    return formatDurationWord(ms, MS_W, 'week', 'weeks');
  }
  if (ms >= MS_D) {
    return formatDurationWord(ms, MS_D, 'day', 'days');
  }
  if (ms >= MS_H) {
    return formatDurationWord(ms, MS_H, 'hour', 'hours');
  }
  if (ms >= MS_M) {
    return formatDurationWord(ms, MS_M, 'minute', 'minutes');
  }
  return formatDurationWord(ms, MS_S, 'second', 'seconds');
}
