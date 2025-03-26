import { assertEquals } from "@std/assert";

Deno.test("jsx", async (t) => {
  await t.step("renders fragments", () => {
    // deno-lint-ignore jsx-no-useless-fragment
    assertEquals(<></>, {
      type: "fragment",
      subelements: [],
    });

    assertEquals(<>Hi</>, {
      type: "fragment",
      subelements: [{ type: "plain", value: "Hi" }],
    });
  });

  await t.step("renders plain elements", () => {
    assertEquals(
      <>
        Some text 😄
        {12345}
        {0.123}
        {null}
        {undefined}
        {true}
        {false}
      </>,
      {
        type: "fragment",
        subelements: [
          { type: "plain", value: "Some text 😄" },
          { type: "plain", value: 12345 },
          { type: "plain", value: 0.123 },
          { type: "plain", value: null },
          { type: "plain", value: undefined },
          { type: "plain", value: true },
          { type: "plain", value: false },
        ],
      },
    );
  });

  await t.step("renders <b> tag", () => {
    assertEquals(<b></b>, {
      type: "text",
      entity: { type: "bold" },
      subelements: [],
    });

    assertEquals(<b>Bold text</b>, {
      type: "text",
      entity: { type: "bold" },
      subelements: [{ type: "plain", value: "Bold text" }],
    });
  });

  await t.step("renders <i> tag", () => {
    assertEquals(<i></i>, {
      type: "text",
      entity: { type: "italic" },
      subelements: [],
    });

    assertEquals(<i>Italic text</i>, {
      type: "text",
      entity: { type: "italic" },
      subelements: [{ type: "plain", value: "Italic text" }],
    });
  });

  await t.step("renders <u> tag", () => {
    assertEquals(<u></u>, {
      type: "text",
      entity: { type: "underline" },
      subelements: [],
    });
    assertEquals(<u>Underline text</u>, {
      type: "text",
      entity: { type: "underline" },
      subelements: [{ type: "plain", value: "Underline text" }],
    });
  });

  await t.step("renders <s> tag", () => {
    assertEquals(<s></s>, {
      type: "text",
      entity: { type: "strikethrough" },
      subelements: [],
    });
    assertEquals(<s>Strikethrough text</s>, {
      type: "text",
      entity: { type: "strikethrough" },
      subelements: [{ type: "plain", value: "Strikethrough text" }],
    });
  });

  await t.step("renders <spoiler> tag", () => {
    assertEquals(<spoiler></spoiler>, {
      type: "text",
      entity: { type: "spoiler" },
      subelements: [],
    });
    assertEquals(<spoiler>Spoiler text</spoiler>, {
      type: "text",
      entity: { type: "spoiler" },
      subelements: [{ type: "plain", value: "Spoiler text" }],
    });
  });

  await t.step("renders <code> tag", () => {
    assertEquals(<code></code>, {
      type: "text",
      entity: { type: "code" },
      subelements: [],
    });
    assertEquals(<code>Code text</code>, {
      type: "text",
      entity: { type: "code" },
      subelements: [{ type: "plain", value: "Code text" }],
    });
  });

  await t.step("renders <a> tag", () => {
    assertEquals(<a href=""></a>, {
      type: "text",
      entity: { type: "link", url: "" },
      subelements: [],
    });

    assertEquals(<a href="https://example.com">Link text</a>, {
      type: "text",
      entity: { type: "link", url: "https://example.com" },
      subelements: [{ type: "plain", value: "Link text" }],
    });
  });

  await t.step("renders <emoji> tag", () => {
    assertEquals(<emoji id="12345" alt="❤️" />, {
      type: "text",
      entity: { type: "custom-emoji", id: "12345", alt: "❤️" },
      subelements: [],
    });
  });

  await t.step("renders <codeblock> tag", () => {
    assertEquals(<codeblock></codeblock>, {
      type: "text",
      entity: {
        type: "codeblock",
        language: undefined,
      },
      subelements: [],
    });

    assertEquals(<codeblock>Code block</codeblock>, {
      type: "text",
      entity: {
        type: "codeblock",
        language: undefined,
      },
      subelements: [{ type: "plain", value: "Code block" }],
    });

    assertEquals(<codeblock lang="python">print("Hello, world!")</codeblock>, {
      type: "text",
      entity: {
        type: "codeblock",
        language: "python",
      },
      subelements: [{ type: "plain", value: 'print("Hello, world!")' }],
    });
  });

  await t.step("renders <blockquote> tag", () => {
    assertEquals(<blockquote></blockquote>, {
      type: "text",
      entity: { type: "blockquote", expandable: false },
      subelements: [],
    });
    assertEquals(<blockquote>Quote</blockquote>, {
      type: "text",
      entity: { type: "blockquote", expandable: false },
      subelements: [{ type: "plain", value: "Quote" }],
    });
    assertEquals(<blockquote expandable>expandable quote</blockquote>, {
      type: "text",
      entity: { type: "blockquote", expandable: true },
      subelements: [{ type: "plain", value: "expandable quote" }],
    });
  });

  await t.step("renders components", () => {
    const Repeat = (props: any) => (
      <>{Array.from({ length: props.n }).fill(props.children)}</>
    );

    assertEquals(<Repeat n={3}>hi</Repeat>, {
      type: "fragment",
      subelements: [
        { type: "plain", value: "hi" },
        { type: "plain", value: "hi" },
        { type: "plain", value: "hi" },
      ],
    });
  });
});
