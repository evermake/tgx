import { defineConfig } from 'tsup'

export default defineConfig({
  outDir: './dist',
  entry: ['./src/index.ts', './src/jsx-runtime.ts'],
})
