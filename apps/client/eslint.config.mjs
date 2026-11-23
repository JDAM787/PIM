import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...nx.configs['flat/react'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      // flat/react lo reactiva; la base ya usa unused-imports/no-unused-vars.
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
