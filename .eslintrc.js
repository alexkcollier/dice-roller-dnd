module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'standard',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  rules: {
    semi: [2, 'never'],
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        printWidth: 100
      }
    ]
  }

}