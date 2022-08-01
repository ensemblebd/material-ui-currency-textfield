import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs'
    }
  ],
  plugins: [
    external({
      includeDependencies: true
    }),
    url(),
    babel({
      babelrc: false,
      presets: [
        ["env", {
          "modules": false
        }],
        "stage-0",
        "react"
      ],
      exclude: 'node_modules/**',
      plugins: [ 'external-helpers' ]
    }),
    resolve(),
    commonjs({
      ignoreGlobal: true,
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/index.js': [
          'cloneElement',
          'createContext',
          'Component',
          'createElement'
        ],
        'node_modules/react-dom/index.js': ['render', 'hydrate'],
        'node_modules/react-is/index.js': [
          'isElement',
          'isValidElementType',
          'ForwardRef'
        ],
        react: Object.keys(require("react")),
        "react-is": Object.keys(require("react-is")),
      }
    })
  ]
}
