/* @flow */

declare class Intl$NumberFormat {
  constructor(locales?: string | Array<string>, options?: Object): void;
  format(value: number): string;
}

declare type IntlType = {
  NumberFormat: Class<Intl$NumberFormat>,
}

declare var Intl: IntlType;
