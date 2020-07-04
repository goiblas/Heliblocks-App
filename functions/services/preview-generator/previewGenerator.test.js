const previewGenerator = require("./index");
const baseStyles = require("./baseStyles");

describe("Preview Generator", () => {
  test("Should return html styled", () => {
    const previewConfig = {
      html: "<h1>Hello World</h1>",
      css: "h1{color: red}",
      alignment: "wide"
    };
    const preview = previewGenerator(previewConfig);

    expect(preview).toContain(`<div class="hb-block-container alignwide">`);
    expect(preview).toContain(previewConfig.html);
    expect(preview).toContain(previewConfig.css);
    expect(preview).toContain(baseStyles);
  });

  test("Should fix html erros", () => {
    const previewConfig = {
      html: "<p>hello<p>world",
      css: "",
      alignment: ""
    };
    const preview = previewGenerator(previewConfig);

    expect(preview).toContain("<p>hello</p><p>world</p>");
  });
});
