import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    semi: false,
    quotes: 'single',
    indent: 2,
  },
  formatters: {
    markdown: 'dprint',
  },
}, {
  files: ['src/types.ts'],
  rules: {
    'ts/no-namespace': 'off',
    'ts/ban-types': 'off',
  },
})
