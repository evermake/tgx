declare global {
  namespace JSX {
    type Element = TgxElement

    interface IntrinsicElements {
      /**
       * Paragraph.
       */
      p: {}

      /**
       * Bold text.
       */
      b: {}

      /**
       * Italic text.
       */
      i: {}

      /**
       * Underlined text.
       */
      u: {}

      /**
       * Strikethrough text.
       */
      s: {}

      /**
       * Spoiler.
       */
      spoiler: {}

      /**
       * Inline fixed-width code.
       */
      code: {}

      /**
       * Inline URL or Telegram link.
       */
      a: { href: string }

      /**
       * Custom Telegram emoji.
       */
      emoji: { id: string }

      /**
       * Fixed-width code block with the optional programming language.
       */
      codeblock: { lang?: string }

      /**
       * Block quotation.
       */
      blockquote: {}
    }
  }
}

export type Props = Record<string, any> | null

export type TgxElement =
  | TgxTextElement
  | TgxFragmentElement

export interface TgxFragmentElement {
  type: 'fragment'
  children: TgxElement[]
}

export interface TgxTextElement {
  type: 'text'
  /**
   * No entity means plain text.
   */
  entity?: TextEntity
  content: (string | TgxTextElement)[]
}

export type TextEntity =
  | { type: 'bold' }
  | { type: 'italic' }
  | { type: 'underline' }
  | { type: 'strikethrough' }
  | { type: 'spoiler' }
  | { type: 'blockquote' }
  | { type: 'link', url: string }
  | { type: 'custom-emoji', id: string }
  | { type: 'code' }
  | { type: 'codeblock', language?: string }

export type TgxNode =
  | Iterable<TgxNode>
  | TgxElement
  | string
  | number
  | boolean
  | null
  | undefined

export const jsxs = jsx

export function jsx(
  tag: keyof JSX.IntrinsicElements | ((props: Props) => JSX.Element),
  props: Props,
): TgxElement {
  if (typeof tag === 'function')
    return tag(props)

  let entity: TextEntity | undefined
  switch (tag) {
    case 'p':
      entity = undefined
      break
    case 'b':
      entity = { type: 'bold' }
      break
    case 'i':
      entity = { type: 'italic' }
      break
    case 'u':
      entity = { type: 'underline' }
      break
    case 's':
      entity = { type: 'strikethrough' }
      break
    case 'spoiler':
      entity = { type: 'spoiler' }
      break
    case 'code':
      entity = { type: 'code' }
      break
    case 'blockquote':
      entity = { type: 'blockquote' }
      break
    case 'a':
      entity = { type: 'link', url: props?.href }
      break
    case 'emoji':
      entity = { type: 'custom-emoji', id: props?.id }
      break
    case 'codeblock':
      entity = { type: 'codeblock', language: props?.lang }
      break
    default:
      throw new Error(`Unsupported tag: ${tag satisfies never}`)
  }

  const children = (props?.children ?? []) as TgxNode
  delete props?.children

  const nodeToContent = (node: TgxNode): (string | TgxTextElement)[] => {
    if (typeof node === 'string' || typeof node === 'number')
      return [String(node)]
    else if (typeof node === 'boolean' || node === null || node === undefined)
      return []
    else if (Array.isArray(node))
      return node.flatMap(child => nodeToContent(child))
    else
      return [node as TgxTextElement]
  }

  const content = nodeToContent(children)
  if (tag === 'p')
    content.push('\n')

  return { type: 'text', entity, content }
}

export function Fragment(props: any) {
  return {
    type: 'fragment',
    children: props.children,
  }
}
