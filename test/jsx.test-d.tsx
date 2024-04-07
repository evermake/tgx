import { assertType, describe, it } from 'vitest'

describe('jsx', () => {
  it('typechecks <button> tag', () => {
    assertType(<button data="example-data">Button with callback data</button>)
    assertType(<button url="https://telegram.dog">Button with URL</button>)
    assertType(<button loginUrl="https://telegram.dog">Button with URL</button>)

    // @ts-expect-error Button must have children.
    assertType(<button data="123"></button>)

    // @ts-expect-error Button must have children.
    assertType(<button url="123"></button>)

    // @ts-expect-error Button must have string children.
    assertType(<button url="123">{123}</button>)

    // @ts-expect-error Button must have string children.
    assertType(<button url="123"><b>Hi!</b></button>)

    // @ts-expect-error Button must have an attribute.
    assertType(<button>Click me</button>)

    // @ts-expect-error Button must have a single attribute.
    assertType(<button data="callback" url="https://example.com">Click me</button>)
    // @ts-expect-error Button must have a single attribute.
    assertType(<button data="callback" loginUrl="https://example.com">Click me</button>)
    // @ts-expect-error Button must have a single attribute.
    assertType(<button url="callback" loginUrl="https://example.com">Click me</button>)
  })
})
