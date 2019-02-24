module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        es6: true
    },
    extends: ['airbnb', 'prettier', 'prettier/react'],
    plugins: ['prettier', 'babel'],
    rules: {
        'prettier/prettier': ['error']
    }
};
