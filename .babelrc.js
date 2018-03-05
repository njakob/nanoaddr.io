module.exports = {
  presets: [
    '@babel/preset-flow',
    '@babel/preset-react',
    '@babel/preset-es2015',
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    'babel-plugin-dynamic-import-node',
    ['babel-plugin-module-resolver', {
      root: ['./src'],
    }],
  ],
};
