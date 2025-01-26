import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  // jsdoc.configs['flat/recommended'],
  // {
  //   files: ['**/*.ts', '**/*.tsx'],
  //   plugins: {
  //     jsdoc,
  //   },
  //   rules: {
  //     'jsdoc_require-description': 'warn',
  //   }
  // },
  ...compat.config({
    plugins: [
      'jsdoc',
    ],
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'next',
      'prettier',
      'plugin:jsdoc/recommended-typescript-error',
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'argsIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
        },
      ],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          'allowShortCircuit': true,
          'allowTernary': true,
        },
      ],
      'jsdoc/require-jsdoc': [
        'error',
        {
          'publicOnly': true,
          'require': {
            'ArrowFunctionExpression': true,
            'ClassDeclaration': true,
            'ClassExpression': true,
            'FunctionDeclaration': true,
            'FunctionExpression': true,
            'MethodDefinition': true,
          },
          'contexts': [
            'TSInterfaceDeclaration',
            'TSTypeAliasDeclaration',
            'TSPropertySignature',
            'TSMethodSignature',
          ],
        },
      ],
      'jsdoc/require-param': [
        'error',
        {
          'checkDestructuredRoots': false,
        },
      ],
      'jsdoc/require-param-description': [
        'error',
        {
          'contexts': [
            'ArrowFunctionExpression',
            'ClassDeclaration',
            'ClassExpression',
            'FunctionDeclaration',
            'FunctionExpression',
            'MethodDefinition',
            'PropertyDefinition',
            'TSInterfaceDeclaration',
            'TSTypeAliasDeclaration',
            'TSPropertySignature',
            'TSMethodSignature',
          ],
        },
      ],
      'jsdoc/check-tag-names': [
        'error',
        {
          'definedTags': [
            'typeParam',
            'remarks',
          ],
        },
      ],
    },
  }),
]

export default eslintConfig;
