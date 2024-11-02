import { describe, expect, it } from 'vitest'

describe('jsx', () => {
  it('renders fragments', () => {
    expect(<></>).toStrictEqual({
      type: 'fragment',
      subelements: [],
    })

    expect(<>Hi</>).toStrictEqual({
      type: 'fragment',
      subelements: [{ type: 'plain', value: 'Hi' }],
    })
  })

  it('renders plain elements', () => {
    expect(
      <>
        Some text 😄
        {12345}
        {0.123}
        {null}
        {undefined}
        {true}
        {false}
      </>,
    ).toStrictEqual({
      type: 'fragment',
      subelements: [
        { type: 'plain', value: 'Some text 😄' },
        { type: 'plain', value: 12345 },
        { type: 'plain', value: 0.123 },
        { type: 'plain', value: null },
        { type: 'plain', value: undefined },
        { type: 'plain', value: true },
        { type: 'plain', value: false },
      ],
    })
  })

  it('renders <b> tag', () => {
    expect(<b></b>).toStrictEqual({
      type: 'text',
      entity: { type: 'bold' },
      subelements: [],
    })

    expect(<b>Bold text</b>).toStrictEqual({
      type: 'text',
      entity: { type: 'bold' },
      subelements: [{ type: 'plain', value: 'Bold text' }],
    })
  })

  it('renders <i> tag', () => {
    expect(<i></i>).toStrictEqual({
      type: 'text',
      entity: { type: 'italic' },
      subelements: [],
    })

    expect(<i>Italic text</i>).toStrictEqual({
      type: 'text',
      entity: { type: 'italic' },
      subelements: [{ type: 'plain', value: 'Italic text' }],
    })
  })

  it('renders <u> tag', () => {
    expect(<u></u>).toStrictEqual({
      type: 'text',
      entity: { type: 'underline' },
      subelements: [],
    })
    expect(<u>Underline text</u>).toStrictEqual({
      type: 'text',
      entity: { type: 'underline' },
      subelements: [{ type: 'plain', value: 'Underline text' }],
    })
  })

  it('renders <s> tag', () => {
    expect(<s></s>).toStrictEqual({
      type: 'text',
      entity: { type: 'strikethrough' },
      subelements: [],
    })
    expect(<s>Strikethrough text</s>).toStrictEqual({
      type: 'text',
      entity: { type: 'strikethrough' },
      subelements: [{ type: 'plain', value: 'Strikethrough text' }],
    })
  })

  it('renders <spoiler> tag', () => {
    expect(<spoiler></spoiler>).toStrictEqual({
      type: 'text',
      entity: { type: 'spoiler' },
      subelements: [],
    })
    expect(<spoiler>Spoiler text</spoiler>).toStrictEqual({
      type: 'text',
      entity: { type: 'spoiler' },
      subelements: [{ type: 'plain', value: 'Spoiler text' }],
    })
  })

  it('renders <code> tag', () => {
    expect(<code></code>).toStrictEqual({
      type: 'text',
      entity: { type: 'code' },
      subelements: [],
    })
    expect(<code>Code text</code>).toStrictEqual({
      type: 'text',
      entity: { type: 'code' },
      subelements: [{ type: 'plain', value: 'Code text' }],
    })
  })

  it('renders <a> tag', () => {
    expect(<a href=""></a>).toStrictEqual({
      type: 'text',
      entity: { type: 'link', url: '' },
      subelements: [],
    })

    expect(<a href="https://example.com">Link text</a>).toStrictEqual({
      type: 'text',
      entity: { type: 'link', url: 'https://example.com' },
      subelements: [{ type: 'plain', value: 'Link text' }],
    })
  })

  it('renders <emoji> tag', () => {
    expect(<emoji id="12345" alt="❤️" />).toStrictEqual({
      type: 'text',
      entity: { type: 'custom-emoji', id: '12345', alt: '❤️' },
      subelements: [],
    })
  })

  it('renders <codeblock> tag', () => {
    expect(<codeblock></codeblock>).toStrictEqual({
      type: 'text',
      entity: {
        type: 'codeblock',
        language: undefined,
      },
      subelements: [],
    })

    expect(<codeblock>Code block</codeblock>).toStrictEqual({
      type: 'text',
      entity: {
        type: 'codeblock',
        language: undefined,
      },
      subelements: [{ type: 'plain', value: 'Code block' }],
    })

    expect(<codeblock lang="python">print("Hello, world!")</codeblock>).toStrictEqual({
      type: 'text',
      entity: {
        type: 'codeblock',
        language: 'python',
      },
      subelements: [{ type: 'plain', value: 'print("Hello, world!")' }],
    })
  })

  it('renders <blockquote> tag', () => {
    expect(<blockquote></blockquote>).toStrictEqual({
      type: 'text',
      entity: { type: 'blockquote', expandable: false },
      subelements: [],
    })
    expect(<blockquote>Quote</blockquote>).toStrictEqual({
      type: 'text',
      entity: { type: 'blockquote', expandable: false },
      subelements: [{ type: 'plain', value: 'Quote' }],
    })
    expect(<blockquote expandable>expandable quote</blockquote>).toStrictEqual({
      type: 'text',
      entity: { type: 'blockquote', expandable: true },
      subelements: [{ type: 'plain', value: 'expandable quote' }],
    })
  })

  it('renders components', () => {
    const Repeat = (props: any) => (
      <>{Array.from({ length: props.n }).fill(props.children)}</>
    )

    expect(<Repeat n={3}>hi</Repeat>).toStrictEqual({
      type: 'fragment',
      subelements: [
        { type: 'plain', value: 'hi' },
        { type: 'plain', value: 'hi' },
        { type: 'plain', value: 'hi' },
      ],
    })
  })
})
