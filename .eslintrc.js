// module.exports = {
//   extends: 'erb',
//   plugins: ['@typescript-eslint'],
//   rules: {
//     // A temporary hack related to IDE not resolving correct package.json
//     'import/no-extraneous-dependencies': 'off',
//     'react/react-in-jsx-scope': 'off',
//     'react/jsx-filename-extension': 'off',
//     'import/extensions': 'off',
//     'import/no-unresolved': 'off',
//     'import/no-import-module-exports': 'off',
//     'no-shadow': 'off',
//     '@typescript-eslint/no-shadow': 'error',
//     'no-unused-vars': 'off',
//     '@typescript-eslint/no-unused-vars': 'error',
//   },
//   parserOptions: {
//     ecmaVersion: 2022,
//     sourceType: 'module',
//   },
//   settings: {
//     'import/resolver': {
//       // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
//       node: {
//         extensions: ['.js', '.jsx', '.ts', '.tsx'],
//         moduleDirectory: ['node_modules', 'src/'],
//       },
//       webpack: {
//         config: require.resolve('./.erb/configs/webpack.config.eslint.ts'),
//       },
//       typescript: {},
//     },
//     'import/parsers': {
//       '@typescript-eslint/parser': ['.ts', '.tsx'],
//     },
//   },
// };
module.exports = {
  extends: 'erb',
  plugins: ['@typescript-eslint'],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'react/react-in-jsx-scope': 'off', // This is correct for React 17+
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-import-module-exports': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'react/no-array-index-key': 'off',
    'no-alert': 'off',
    'no-console': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Enable parsing of JSX
    },
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      webpack: {
        config: require.resolve('./.erb/configs/webpack.config.eslint.ts'),
      },
      typescript: {}, // Add support for TypeScript imports
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
};
