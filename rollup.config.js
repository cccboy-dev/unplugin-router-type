import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'

const buildTools = ['index', 'webpack', 'vite', 'rollup', 'esbuild']

export default defineConfig({
  input: buildTools.map(item => `src/${item}.ts`),
  output: [
    {
      entryFileNames: '[name].mjs',
      format: 'esm',
      dir: 'dist',
    },
    {
      entryFileNames: '[name].js',
      format: 'cjs',
      dir: 'dist',
      exports: 'auto',
    },
  ],
  plugins: [typescript()],
})
