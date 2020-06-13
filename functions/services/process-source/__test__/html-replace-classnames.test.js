const replaceClassnames = require("../html-replace-classnames");

describe("HTML Replace classnames", () => {
  test("should replace classnames", () => {
    const html = '<div class="example"></div>';
    const mapping = {
      example: "__example"
    };
    const htmlReplaced = replaceClassnames(html, mapping);
    const htmlExpected = '<div class="__example"></div>';

    expect(htmlReplaced).toBe(htmlExpected);
  });
});
