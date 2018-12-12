import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'
import pkg from './package.json'

export default [
  // browser
  {
    input: 'src/index.js',
    output: [
      {
        name: 'dndDiceRoller',
        file: pkg.browser.full,
        format: 'umd'
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({ exclude: 'node_modules/**', runtimeHelpers: true }),
      uglify()
    ]
  },
  // cjs and es
  {
    input: 'src/index.js',
    output: [{ file: pkg.main, format: 'cjs' }, { file: pkg.module, format: 'es' }]
  }
]
