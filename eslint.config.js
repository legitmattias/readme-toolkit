import globals from 'globals'
import jestPlugin from 'eslint-plugin-jest'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default [
  {
    // General rules for all JS and TS files
    files: ['**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',  // Use ES6 modules (import/export)
      parser: tsParser,      // Use the TypeScript parser
      globals: {
        ...globals.node,     // Node.js environment globals like `require`, `module`, etc.
        ...globals.es2021    // ES2021 globals like `Promise`, `Set`, etc.
      }
    },
    rules: {
      // Best Practices
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'off',

      // Code Style
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': ['error', {
        'skipBlankLines': false,
        'ignoreComments': false
      }],

      // ES6 Specific
      'prefer-arrow-callback': 'error',
      'arrow-spacing': ['error', { 'before': true, 'after': true }],

      // Node.js Specific
      'no-buffer-constructor': 'error',

      // Code Quality
      'no-unused-vars': ['error', { 'args': 'none' }],
      'eqeqeq': ['error', 'always'],
      'no-undef': 'error',
      'no-warning-comments': ['warn', { terms: ['todo', 'fixme'], location: 'start' }]
    }
  },
  {
    // Specific TypeScript rules
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser, // Use the TypeScript parser
      globals: {
        ...globals.node,    // Keep Node.js environment globals
        ...globals.es2021,  // ES2021 globals
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],  // Prefer interfaces over type aliases
      '@typescript-eslint/no-unused-vars': ['error'],  // Ensure no unused variables in TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',   // Discourage using `any`
      '@typescript-eslint/explicit-function-return-type': 'off'  // Turn off function return type rule
    }
  },
  {
    // Specific Jest-related rules for .test.ts/.test.js files
    files: ['**/*.test.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,  // Jest globals for test files
        jest: 'readonly'
      }
    },
    plugins: {
      jest: jestPlugin
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/valid-expect': 'error'
    }
  }
]
