const parseCss = require("..");

describe("Parse css", () => {
  test("should parse css", () => {
    const config = {
      hash: "h4sh",
      wrapper: ".hb_h4sh"
    };

    const { css, variables, replacedMapping } = parseCss(
      ":root{--hb-color-text: #111;--color: red}.example{}",
      config
    );

    const variablesExpected = [
      {
        type: "color",
        label: "Text",
        variable: "--hb-color-text",
        value: "#111"
      }
    ];

    const replacedMappingExpected = {
      example: "_example_h4sh"
    };
    expect(css).toBe(".hb_h4sh{--color: red}.hb_h4sh ._example_h4sh{}");
    expect(variables).toEqual(variablesExpected);
    expect(replacedMapping).toEqual(replacedMappingExpected);
  });
});
