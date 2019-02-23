module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: ['airbnb', 'prettier', 'prettier/react'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': ['error']
    }
};
