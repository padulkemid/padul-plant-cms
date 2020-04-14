module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    'import/no-dynamic-require': 'off',
    'no-unused-vars': 'warn',
    camelcase: 'off',
  },
};
