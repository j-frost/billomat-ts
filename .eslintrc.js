module.exports = {
    'env': {
        'node': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'project': 'tsconfig.json',
        'sourceType': 'module'
    },
    'plugins': [
        'eslint-plugin-jsdoc',
        'eslint-plugin-prefer-arrow',
        '@typescript-eslint',
        '@typescript-eslint/tslint',
    ],
    'rules': {
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': [
            'error',
            {
                'default': 'array'
            }
        ],
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/dot-notation': 'error',
        '@typescript-eslint/naming-convention': 'error',
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/quotes': [
            'error',
            'single'
        ],
        '@typescript-eslint/triple-slash-reference': [
            'error',
            {
                'path': 'always',
                'types': 'prefer-import',
                'lib': 'always'
            }
        ],
        '@typescript-eslint/unified-signatures': 'error',
        'complexity': 'off',
        'constructor-super': 'error',
        'eqeqeq': [
            'error',
            'smart'
        ],
        'guard-for-in': 'error',
        'id-blacklist': [
            'error',
            'any',
            'Number',
            'number',
            'String',
            'string',
            'Boolean',
            'boolean',
            'Undefined',
            'undefined'
        ],
        'id-match': 'error',
        'jsdoc/check-alignment': 'error',
        'jsdoc/check-indentation': 'error',
        'jsdoc/newline-after-description': 'error',
        'max-classes-per-file': [
            'error',
            1
        ],
        'new-parens': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-cond-assign': 'error',
        'no-console': 'off',
        'no-debugger': 'error',
        'no-empty': 'error',
        'no-eval': 'error',
        'no-fallthrough': 'off',
        'no-invalid-this': 'off',
        'no-new-wrappers': 'error',
        'no-shadow': [
            'error',
            {
                'hoist': 'all'
            }
        ],
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-underscore-dangle': ['error', {'allowAfterThis': true}],
        'no-unsafe-finally': 'error',
        'no-unused-labels': 'error',
        'no-var': 'error',
        'object-shorthand': [
            'error',
            'never'
        ],
        'one-var': [
            'error',
            'never'
        ],
        'prefer-arrow/prefer-arrow-functions': 'error',
        'prefer-const': 'error',
        'radix': 'error',
        'spaced-comment': [
            'error',
            'always',
            {
                'markers': [
                    '/'
                ]
            }
        ],
        'use-isnan': 'error',
        'valid-typeof': 'off',
        '@typescript-eslint/tslint/config': [
            'error',
            {
                'rules': {
                    'object-literal-sort-keys': [
                        true,
                        'ignore-case'
                    ],
                    'typedef': [
                        true,
                        'call-signature',
                        'property-declaration'
                    ]
                }
            }
        ]
    }
};
