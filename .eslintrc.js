/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  extends: ['next/core-web-vitals', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-console': 'error',
    '@next/next/no-img-element': 'off',
  },
};
