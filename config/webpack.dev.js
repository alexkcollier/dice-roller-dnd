const commonWebpackConfig = require('./webpack.common')
const merge = require('webpack-merge')

module.exports = merge(commonWebpackConfig, {
  mode: 'development',
  watch: true,
  devtool: 'cheap-module-eval-source-map'
})
