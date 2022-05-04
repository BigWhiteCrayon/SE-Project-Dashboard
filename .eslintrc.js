module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            modules: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        requireConfigFile: false
    },
    plugins: [
        'react', 'jsx'
    ],
    parser: '@babel/eslint-parser',
    rules: {
        indent: ['error', 4],
        semi: ['error', 'always']
    }
};
