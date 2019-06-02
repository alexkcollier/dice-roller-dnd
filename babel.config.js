module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3
      }
    ]
  ],
  env: {
    test: {
      presets: [['@babel/preset-env']]
    }
  },
  plugins: ['@babel/plugin-transform-runtime']
}
