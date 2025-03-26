Implementation of `jsx-runtime` to create Telegram messages using JSX.

## Installation

```sh
deno add jsr:@evermake/tgx
# or
npx jsr add @evermake/tgx
# or
pnpm dlx jsr add @evermake/tgx
# or
yarn dlx jsr add @evermake/tgx
# or
bunx jsr add @evermake/tgx
```

Then in your `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@evermake/tgx",
    // ...
  }
}
```

## Example

Usage with [grammY](https://grammy.dev):

```tsx
import { html } from '@evermake/tgx'
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
