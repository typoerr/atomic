import * as path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

const base = path.resolve(__dirname)
const tsconfig = path.join(base, 'tsconfig.json')

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      entryFileNames: '[name].js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      dir: 'dist',
      entryFileNames: '[name].module.js',
      format: 'es',
      sourcemap: true,
    },
    {
      dir: 'dist',
      name: 'atomic',
      entryFileNames: '[name].umd.js',
      format: 'umd',
      sourcemap: true,
    },
  ],
  context: 'this',
  plugins: [typescript({ tsconfig, rootDir: './src' }), resolve()],
}
