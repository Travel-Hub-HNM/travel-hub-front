import nextPlugin from '@next/eslint-plugin-next'
import * as tseslint from '@typescript-eslint/eslint-plugin'
import * as tsParser from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import jsx11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            '@next/next': nextPlugin,
            react: react,
            'react-hooks': reactHooks,
            'jsx-a11y': jsx11y,
            import: importPlugin,
            '@typescript-eslint': tseslint,
        },
        rules: {
            // TypeScript 관련
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-empty-interface': 'warn',
            '@typescript-eslint/no-empty-function': 'warn',

            // React 관련
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/jsx-props-no-spreading': 'off',
            'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
            'react/self-closing-comp': ['error', { component: true, html: true }],
            'react/no-unknown-property': ['error', { ignore: ['css'] }],

            // React Hooks 관련
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Import 관련
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
            'import/no-duplicates': 'error',

            // 접근성 관련
            'jsx-a11y/alt-text': 'error',
            'jsx-a11y/aria-props': 'error',
            'jsx-a11y/aria-role': 'error',
            'jsx-a11y/role-has-required-aria-props': 'error',

            // Next.js 관련
            '@next/next/no-html-link-for-pages': 'off',
            '@next/next/no-img-element': 'error',

            // 일반적인 코딩 스타일
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-unused-vars': 'off', // @typescript-eslint/no-unused-vars를 사용
            'prefer-const': 'error',
            'no-var': 'error',
            eqeqeq: ['error', 'always'],
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
            'no-trailing-spaces': 'error',
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                },
                node: true,
            },
        },
    },
    {
        ignores: [
            '**/node_modules/**',
            '**/build/**',
            '**/dist/**',
            '**/.next/**',
            '**/*.config.js',
            '**/*.config.mjs',
            '**/public/**',
        ],
    },
    eslintConfigPrettier,
]
