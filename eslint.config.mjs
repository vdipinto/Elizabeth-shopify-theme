// eslint.config.mjs
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      '.cache',
      '*.min.js',
      'logs',
      '**/*.json', // ⬅️ Ignore all JSON files
      '.shopify/', // ⬅️ Shopify CLI metadata
      'snippets/', // ⬅️ Liquid snippets
      'sections/', // ⬅️ Liquid sections
      'templates/', // ⬅️ Liquid templates
      'assets/*.css', // ⬅️ CSS handled by Prettier
    ],
  },
  js.configs.recommended,
  prettier,
  {
    files: ['**/*.js'], // only lint JS
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
];
