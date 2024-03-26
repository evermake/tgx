# TGX — Telegram JSX

[![npm version](https://img.shields.io/npm/v/%40telegum%2Ftgx?style=flat&logo=npm&labelColor=18181b&color=51a2dd)](https://www.npmjs.com/package/@telegum/tgx) [![coverage](https://img.shields.io/codecov/c/github/telegum/tgx?style=flat&logo=codecov&labelColor=18181b&color=51a2dd)](https://app.codecov.io/gh/telegum/tgx)

https://app.codecov.io/gh/telegum/tgx
Implementation of `jsx-runtime` to create Telegram messages using JSX.

## Usage

> [!NOTE]
> This package only provides the runtime for JSX that just transforms JSX syntax into TGX elements.
> What will be done with these elements is up to you or other packages.

1. Install the package:

   ```sh
   npm install @telegum/tgx
   ```

2. Update JSX-related options in your `tsconfig.json`:

   ```json
   {
     "compilerOptions": {
       // ...
       "jsx": "react-jsx",
       "jsxImportSource": "@telegum/tgx"
       // ...
     }
   }
   ```

3. Use JSX in your code:

   ```tsx
   // example.jsx
   import { bot } from 'example-telegram-framework'

   function UserCard({ id, name }) {
     return (
       <>
         <b>
           Your name:
           {name}
         </b>
         <i>
           Your ID:
           {id}
         </i>
       </>
     )
   }

   bot.on('message', (ctx) => {
     ctx.reply(<UserCard id={ctx.user.id} name={ctx.user.first_name} />)
   })
   ```
