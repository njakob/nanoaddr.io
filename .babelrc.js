module.exports = {
  presets: [
    '@babel/preset-flow',
    '@babel/preset-react',
    '@babel/preset-es2015',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    // 'react-hot-loader/babel',
    ['module-resolver', {
      root: ['./src'],
    }],
  ],
};
