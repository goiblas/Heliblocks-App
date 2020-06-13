const scope = require("../scope-css");

describe("Scope CSS", () => {
  const hash = "h4sh";
  const wrapper = ".wrapper";

  test("should transform selectors", () => {
    const cssExample = ".title {}#title {}";
    const cssExpected = `.wrapper ._title_${hash} {}.wrapper #title {}`;

    const replacedExpected = {
      title: `_title_${hash}`
    };

    const { css, replaced } = scope(cssExample, { hash, wrapper });
    expect(css).toBe(cssExpected);
    expect(replaced).toEqual(replacedExpected);
  });

  test("should replace root tag", () => {
    const cssExample = ":root{} html{}.title{}";
    const cssExpected = `${wrapper}{}${wrapper}{}${wrapper} ._title_${hash}{}`;

    const { css } = scope(cssExample, { wrapper, hash });
    expect(css).toBe(cssExpected);
  });

  test("should replace animation name", () => {
    const cssExample =
      "@keyframes fade-in{}.box{animation: infinite fade-in 1s;}";
    const cssExpected = `@keyframes wrapper-fade-in{}${wrapper} ._box_${hash}{animation: infinite wrapper-fade-in 1s;}`;

    const { css } = scope(cssExample, { wrapper, hash });
    expect(css).toBe(cssExpected);
  });
});
