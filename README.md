[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![license][license-src]][license-href]
[![coverage][coverage-src]][coverage-href]

Implementation of `jsx-runtime` to create Telegram messages using JSX.

## Installation

```
npm i @telegum/tgx
```

Then in your `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@telegum/tgx",
    // ...
  }
}
```

## Example

Usage with [grammY](https://grammy.dev):

```tsx
import { html } from '@telegum/tgx'
import { Bot } from 'grammy'

const Greeting = (props: { name: string }) => (
  <>Hello, <b>{props.name}</b>!</>
)

const bot = new Bot(/* TOKEN */)

bot.command('start', async (ctx) => {
  await ctx.reply(
    html(<Greeting name={ctx.from.first_name} />),
    { parse_mode: 'HTML' }
  )
})

bot.start()
```

## License

[MIT](./LICENSE)

<!-- Badges -->

[npm-downloads-src]: https://img.shields.io/npm/dm/%40telegum%2Ftgx?style=flat&color=e23f79&labelColor=000&label=npm
[npm-downloads-href]: https://npmjs.com/package/@telegum/tgx
[license-src]: https://img.shields.io/github/license/telegum/tgx?style=flat&color=e23f79&labelColor=000&label=license
[license-href]: https://github.com/telegum/tgx/blob/main/LICENSE
[coverage-src]: https://img.shields.io/codecov/c/github/telegum/tgx?style=flat&color=e23f79&labelColor=000&label=coverage
[coverage-href]: https://app.codecov.io/gh/telegum/tgx
