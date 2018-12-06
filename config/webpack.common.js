const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
const pkg = require('../package.json')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    filename: `${pkg.name}.js`,
    library: 'jsRoller',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../dist'),
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '../')
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsFilename: 'bundle-stats.json',
      statsOptions: { source: false }
    })
  ]
}
