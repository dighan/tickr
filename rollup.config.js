import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const env = process.env.NODE_ENV

const config = {
  name: 'Tickr',
  input: 'src/createTicker.js',
  output: {
    format: 'umd'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}

if (env === 'production') {
  config.plugins.push(uglify())
}

export default config
