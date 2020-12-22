module.exports = {
    env: {
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:jsdoc/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
    ],
    overrides: [
        {
            files: ['*-test.ts', '*.test.ts', '**/*.spec.ts'],
            rules: {
                'no-explicit-any': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-unsafe-assignment': 'off',
                '@typescript-eslint/no-unsafe-member-access': 'off',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['jsdoc', 'prefer-arrow', '@typescript-eslint', '@typescript-eslint/tslint', 'prettier'],
    root: true,
    rules: {
        'jsdoc/require-jsdoc': ['error', { publicOnly: true }],
    },
};
