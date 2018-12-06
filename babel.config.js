module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage'
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
