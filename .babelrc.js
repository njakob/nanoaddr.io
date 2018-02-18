module.exports = {
  plugins: [
    '@babel/plugin-syntax-jsx',
    '@babel/plugin-syntax-class-properties',
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-syntax-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-react-jsx',
    '@babel/plugin-transform-react-display-name',
    'react-hot-loader/babel',
    ['module-resolver', {
      root: ['./src']
    }]
  ]
};
