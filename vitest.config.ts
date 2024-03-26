import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
    },
  },
  esbuild: {
    jsx: 'automatic',
    jsxDev: false,
    jsxImportSource: '@telegum/tgx',
  },
  resolve: {
    alias: {
      '@telegum/tgx': '/src',
    },
  },
})
