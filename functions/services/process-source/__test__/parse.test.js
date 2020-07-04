const parse = require("..");

const HASH = "h4Sh";
jest.mock("nanoid", () => {
  return {
    nanoid: jest.fn(() => "h4Sh")
  };
});

describe("Parse", () => {
  test("should parse html", () => {
    const { css, variables, html, wrapperClassname } = parse({
      css: ":root{--hb-color-text: #222222;}p {}.example{}",
      html: '<div class="example"></div>'
    });
    const variablesExpected = [
      {
        type: "color",
        label: "Text",
        variable: "--hb-color-text",
        value: "#222222"
      }
    ];

    expect(variables).toEqual(variablesExpected);
    expect(css).toBe(
      `.hb_${HASH}{}.hb_${HASH} p {}.hb_${HASH} ._example_${HASH}{}`
    );
    expect(html).toBe(`<div class="_example_${HASH}"></div>`);
    expect(wrapperClassname).toBe(`hb_${HASH}`);
  });

  test("should fix errors", () => {
    const { css, variables, html, wrapperClassname } = parse({
      css: ":root{-- hb-color-text: #222222;}",
      html: "<p>hello<p>world"
    });

    expect(variables).toEqual([]);
    expect(html).toBe("<p>hello</p><p>world</p>");
    expect(css).toBe(":root{-- hb-color-text: #222222;}");
    expect(wrapperClassname).toBe(`hb_${HASH}`);
  });
});
