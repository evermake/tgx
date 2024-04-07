import type { Props, TgxElement, TgxFragmentElement, TgxNode } from './types'

export const jsxs = jsx

export function jsx(
  tag: keyof JSX.IntrinsicElements | ((props: Props) => JSX.Element),
  props: Props,
): TgxElement {
  if (typeof tag === 'function')
    return tag(props)

  return createElementFromIntrinsic(tag, props as JSX.IntrinsicElements[keyof JSX.IntrinsicElements])
}

export function Fragment(props: { children?: TgxNode } | null): TgxFragmentElement {
  const children = props?.children ?? []

  return {
    type: 'fragment',
    subelements: nodeToElements(children),
  }
}

function createElementFromIntrinsic(
  tag: keyof JSX.IntrinsicElements,
  props: JSX.IntrinsicElements[keyof JSX.IntrinsicElements],
): TgxElement {
  switch (tag) {
    case 'b':
      return {
        type: 'text',
        entity: { type: 'bold' },
        subelements: nodeToElements((props as JSX.IntrinsicElements['b']).children ?? []),
      }
    case 'i':
      return {
        type: 'text',
        entity: { type: 'italic' },
        subelements: nodeToElements((props as JSX.IntrinsicElements['i']).children ?? []),
      }
    case 'u':
      return {
        type: 'text',
        entity: { type: 'underline' },
        subelements: nodeToElements((props as JSX.IntrinsicElements['u']).children ?? []),
      }
    case 's':
      return {
        type: 'text',
        entity: { type: 'strikethrough' },
        subelements: nodeToElements((props as JSX.IntrinsicElements['s']).children ?? []),
      }
    case 'spoiler':
      return {
        type: 'text',
        entity: { type: 'spoiler' },
        subelements: nodeToElements((props as JSX.IntrinsicElements['spoiler']).children ?? []),
      }
    case 'code':
      return {
        type: 'text',
        entity: { type: 'code' },
        subelements: nodeToElements((props as JSX.IntrinsicElements['code']).children ?? []),
      }
    case 'a':
      return {
        type: 'text',
        entity: { type: 'link', url: (props as JSX.IntrinsicElements['a']).href },
        subelements: nodeToElements((props as JSX.IntrinsicElements['a']).children ?? []),
      }
    case 'emoji':
      return {
        type: 'text',
        entity: { type: 'custom-emoji', id: (props as JSX.IntrinsicElements['emoji']).id },
        subelements: [{ type: 'plain', value: (props as JSX.IntrinsicElements['emoji']).alt }],
      }
    case 'codeblock':
      return {
        type: 'text',
        entity: { type: 'codeblock', language: (props as JSX.IntrinsicElements['codeblock']).lang },
        subelements: nodeToElements((props as JSX.IntrinsicElements['codeblock']).children ?? []),
      }
    case 'blockquote':
      return {
        type: 'text',
        entity: { type: 'blockquote' },
        subelements: nodeToElements((props as JSX.IntrinsicElements['blockquote']).children ?? []),
      }
    case 'photo':
      return {
        type: 'photo',
        file: (props as JSX.IntrinsicElements['photo']).file,
        spoiler: (props as JSX.IntrinsicElements['photo']).spoiler,
      }
    case 'video':
      return {
        type: 'video',
        file: (props as JSX.IntrinsicElements['video']).file,
        spoiler: (props as JSX.IntrinsicElements['video']).spoiler,
        duration: (props as JSX.IntrinsicElements['video']).duration,
        width: (props as JSX.IntrinsicElements['video']).width,
        height: (props as JSX.IntrinsicElements['video']).height,
      }
    case 'keyboard':
      return {
        type: 'keyboard',
        subelements: nodeToElements((props as JSX.IntrinsicElements['keyboard']).children ?? []),
      }
    case 'button':
      return {
        type: 'button',
        text: (props as JSX.IntrinsicElements['button']).children,
        ...(('data' in props) ? { data: props.data } : undefined),
        ...(('url' in props) ? { url: props.url } : undefined),
        ...(('loginUrl' in props) ? { loginUrl: props.loginUrl } : undefined),
      }
    case 'br':
      return { type: 'br' }
  }
}

function nodeToElements(node: TgxNode): TgxElement[] {
  if (
    typeof node === 'string'
    || typeof node === 'number'
    || typeof node === 'boolean'
    || node === null
    || node === undefined
  )
    return [{ type: 'plain', value: node }]
  else if (Array.isArray(node))
    return node.flatMap(child => nodeToElements(child))
  else
    return [node]
}
