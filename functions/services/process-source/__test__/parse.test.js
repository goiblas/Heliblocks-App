const parse = require("..");

const HASH = "h4Sh";
jest.mock("nanoid", () => {
  return {
    nanoid: jest.fn(() => "h4Sh"),
  };
});

describe("Parse", () => {
  test("should parse html", () => {
    const { css, variables, html, wrapperClassname } = parse({
      css: ":root{--hb-color-text: #222222;}p {}.example{}",
      html: '<div class="example"></div>',
    });
    const variablesExpected = [
      {
        type: "color",
        label: "Text",
        variable: "--hb-color-text",
        value: "#222222",
      },
    ];

    expect(variables).toEqual(variablesExpected);
    expect(css).toBe(
      `.hb_${HASH}{}.hb_${HASH} p {}.hb_${HASH} ._example_${HASH}{}`
    );
    expect(html).toBe(`<div class="_example_${HASH}"></div>`);
    expect(wrapperClassname).toBe(`hb_${HASH}`);
  });
  test("should fix errors", () => {
    const { html } = parse({
      css: "",
      html: "<p>hello<p>world",
    });
    expect(html).toBe("<p>hello</p><p>world</p>");
  });
  test("should parse with special characters", () => {
    const { css, html } = parse({
      css: ".md\\:special{}",
      html: '<div class="md:special"></div>',
    });

    expect(css).toBe(`.hb_${HASH} ._md\\:special_${HASH}{}`);
    expect(html).toBe(`<div class="_md:special_${HASH}"></div>`);
  });
});
