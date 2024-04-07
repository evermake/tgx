declare global {
  namespace JSX {
    interface ElementAttributesProperty {
      props: {}
    }

    interface ElementChildrenAttribute {
      children: {}
    }

    type Element = TgxElement

    interface IntrinsicElements {
      /**
       * Bold text.
       */
      b: PropsWithChildren

      /**
       * Italic text.
       */
      i: PropsWithChildren

      /**
       * Underlined text.
       */
      u: PropsWithChildren

      /**
       * Strikethrough text.
       */
      s: PropsWithChildren

      /**
       * Spoiler.
       */
      spoiler: PropsWithChildren

      /**
       * Inline fixed-width code.
       */
      code: PropsWithChildren

      /**
       * Inline URL or Telegram link.
       */
      a: PropsWithChildren<{ href: string }>

      /**
       * Custom Telegram emoji.
       */
      emoji: {
        /**
         * Unique identifier of the custom emoji.
         */
        id: string

        /**
         * Alternative emoji that will be shown instead of the custom emoji in
         * places where a custom emoji cannot be displayed.
         */
        alt: string
      }

      /**
       * Fixed-width code block with the optional programming language.
       */
      codeblock: PropsWithChildren<{ lang?: string }>

      /**
       * Block quotation.
       */
      blockquote: PropsWithChildren

      /**
       * Line break.
       */
      br: {}

      photo: {
        file: any
        spoiler?: boolean
      }

      video: {
        file: any
        spoiler?: boolean
        duration?: number
        width?: number
        height?: number
      }

      keyboard: PropsWithChildren

      button:
      & (
        | { data: string, url?: never, loginUrl?: never }
        | { data?: never, url: string, loginUrl?: never }
        | { data?: never, url?: never, loginUrl: string }
      ) & { children: string }
    }
  }
}

export type TgxNode =
  | TgxNode[]
  | TgxElement
  | string
  | number
  | boolean
  | null
  | undefined

export type PropsWithChildren<P = {}> = {
  children?: TgxNode
} & P

export type Props =
  | null
  | ({
    [key: string]: any
  } & {
    children?: TgxNode
  })

export type TgxElement =
  | TgxPlainElement
  | TgxFragmentElement
  | TgxBrElement
  | TgxTextElement
  | TgxPhotoElement
  | TgxVideoElement
  | TgxKeyboardElement
  | TgxButtonElement

export interface TgxPlainElement {
  type: 'plain'
  value: string | number | boolean | null | undefined
}

export interface TgxFragmentElement {
  type: 'fragment'
  subelements: TgxElement[]
}

export interface TgxBrElement {
  type: 'br'
}

export interface TgxTextElement {
  type: 'text'
  entity: TextEntity
  subelements: TgxElement[]
}

export interface TgxPhotoElement {
  type: 'photo'
  file: any
  spoiler?: boolean
}

export interface TgxVideoElement {
  type: 'video'
  file: any
  spoiler?: boolean
  duration?: number
  width?: number
  height?: number
}

export interface TgxKeyboardElement {
  type: 'keyboard'
  subelements: TgxElement[]
}

export interface TgxButtonElement {
  type: 'button'
  text: string
  data?: string
  url?: string
  loginUrl?: string
}

export type TextEntity =
  | { type: 'bold' }
  | { type: 'italic' }
  | { type: 'underline' }
  | { type: 'strikethrough' }
  | { type: 'code' }
  | { type: 'spoiler' }
  | { type: 'blockquote' }
  | { type: 'link', url: string }
  | { type: 'codeblock', language?: string }
  | { type: 'custom-emoji', id: string }
