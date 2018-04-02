module.exports = {
  extends: [
    '@njakob/eslint-config/es6-flow-react',
  ],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'react/sort-comp': 'off',
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  env: {
    node: true,
  },
};
