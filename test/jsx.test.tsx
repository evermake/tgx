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
      entity: { type: 'custom-emoji', id: '12345' },
      subelements: [{ type: 'plain', value: '❤️' }],
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
      entity: { type: 'blockquote' },
      subelements: [],
    })
    expect(<blockquote>Quote</blockquote>).toStrictEqual({
      type: 'text',
      entity: { type: 'blockquote' },
      subelements: [{ type: 'plain', value: 'Quote' }],
    })
  })

  it('renders <photo> tag', () => {
    expect(<photo file="https://example.com/photo.jpg" />).toStrictEqual({
      type: 'photo',
      file: 'https://example.com/photo.jpg',
      spoiler: undefined,
    })
    expect(<photo spoiler file="https://example.com/photo.jpg" />).toStrictEqual({
      type: 'photo',
      file: 'https://example.com/photo.jpg',
      spoiler: true,
    })
    expect(<photo file="12345" spoiler={false} />).toStrictEqual({
      type: 'photo',
      file: '12345',
      spoiler: false,
    })
  })

  it('renders <video> tag', () => {
    expect(<video file="https://example.com/video.mp4" />).toStrictEqual({
      type: 'video',
      file: 'https://example.com/video.mp4',
      duration: undefined,
      height: undefined,
      width: undefined,
      spoiler: undefined,
    })
  })

  it('renders <keyboard> tag', () => {
    expect(<keyboard></keyboard>).toStrictEqual({
      type: 'keyboard',
      subelements: [],
    })

    expect(
      <keyboard>
        <button data="callback">Callback button</button>
        <button url="https://example.com">URL button</button>
        <button loginUrl="https://example.com/login">Login URL button</button>
        <button
          loginUrl={{
            url: 'https://example.com/login',
            bot_username: 'bot',
            request_write_access: true,
            forward_text: 'Forward text',
          }}
        >
          Login URL button
        </button>
      </keyboard>,
    ).toStrictEqual({
      type: 'keyboard',
      subelements: [
        {
          type: 'button',
          text: 'Callback button',
          data: 'callback',
        },
        {
          type: 'button',
          text: 'URL button',
          url: 'https://example.com',
        },
        {
          type: 'button',
          text: 'Login URL button',
          loginUrl: 'https://example.com/login',
        },
        {
          type: 'button',
          text: 'Login URL button',
          loginUrl: {
            url: 'https://example.com/login',
            bot_username: 'bot',
            request_write_access: true,
            forward_text: 'Forward text',
          },
        },
      ],
    })
  })

  it('renders <button> tag', () => {
    expect(<button data="callback">Click me</button>).toStrictEqual({
      type: 'button',
      text: 'Click me',
      data: 'callback',
    })

    expect(<button url="https://example.com">Click me</button>).toStrictEqual({
      type: 'button',
      text: 'Click me',
      url: 'https://example.com',
    })
  })

  it('renders <br> tag', () => {
    expect(<br />).toStrictEqual({ type: 'br' })
  })

  it('renders components', () => {
    const CustomComponent = (props: { text: string }) => <b>{props.text}</b>

    expect(<CustomComponent text="Custom component" />).toStrictEqual({
      type: 'text',
      entity: { type: 'bold' },
      subelements: [{ type: 'plain', value: 'Custom component' }],
    })
  })

  it('renders nested tags', () => {
    expect(
      <>
        <>
          <b>
            Bold
            <i>bold and italic</i>
            {' '}
            <u>bold and underline</u>
          </b>
          <spoiler>
            <photo file="https://example.com/photo.jpg" />
            <video file="https://example.com/video.mp4" />
            <s>
              <code>Spoiler code</code>
              <b>
                Strikethrough bold spoiler
                <i>
                  Strikethrough bold italic spoiler
                  <u>
                    Strikethrough bold italic underline spoiler
                  </u>
                </i>
              </b>
            </s>
          </spoiler>
        </>
        <keyboard>
          <button data="callback">Callback button</button>
          <>
            <b>
              Bold text and
              {' '}
              <button url="https://example.com">URL button</button>
              <button loginUrl="https://example.com/login1">Login button</button>
              <button loginUrl={{ url: 'https://example.com/login2' }}>Login button 2</button>
            </b>
          </>
        </keyboard>
      </>,
    ).toStrictEqual({
      type: 'fragment',
      subelements: [
        {
          type: 'fragment',
          subelements: [
            {
              type: 'text',
              entity: { type: 'bold' },
              subelements: [
                { type: 'plain', value: 'Bold' },
                {
                  type: 'text',
                  entity: { type: 'italic' },
                  subelements: [{ type: 'plain', value: 'bold and italic' }],
                },
                { type: 'plain', value: ' ' },
                {
                  type: 'text',
                  entity: { type: 'underline' },
                  subelements: [{ type: 'plain', value: 'bold and underline' }],
                },
              ],
            },
            {
              type: 'text',
              entity: { type: 'spoiler' },
              subelements: [
                { type: 'photo', file: 'https://example.com/photo.jpg', spoiler: undefined },
                {
                  type: 'video',
                  file: 'https://example.com/video.mp4',
                  duration: undefined,
                  height: undefined,
                  width: undefined,
                  spoiler: undefined,
                },
                {
                  type: 'text',
                  entity: { type: 'strikethrough' },
                  subelements: [
                    {
                      type: 'text',
                      entity: { type: 'code' },
                      subelements: [{ type: 'plain', value: 'Spoiler code' }],
                    },
                    {
                      type: 'text',
                      entity: { type: 'bold' },
                      subelements: [
                        { type: 'plain', value: 'Strikethrough bold spoiler' },
                        {
                          type: 'text',
                          entity: { type: 'italic' },
                          subelements: [
                            { type: 'plain', value: 'Strikethrough bold italic spoiler' },
                            {
                              type: 'text',
                              entity: { type: 'underline' },
                              subelements: [
                                { type: 'plain', value: 'Strikethrough bold italic underline spoiler' },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'keyboard',
          subelements: [
            {
              type: 'button',
              text: 'Callback button',
              data: 'callback',
            },
            {
              type: 'fragment',
              subelements: [
                {
                  type: 'text',
                  entity: { type: 'bold' },
                  subelements: [
                    { type: 'plain', value: 'Bold text and' },
                    { type: 'plain', value: ' ' },
                    {
                      type: 'button',
                      text: 'URL button',
                      url: 'https://example.com',
                    },
                    {
                      type: 'button',
                      text: 'Login button',
                      loginUrl: 'https://example.com/login1',
                    },
                    {
                      type: 'button',
                      text: 'Login button 2',
                      loginUrl: { url: 'https://example.com/login2' },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    })
  })
})
