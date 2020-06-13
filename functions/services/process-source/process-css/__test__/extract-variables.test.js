const extract = require("../extract-css-variables");

describe("Extract variables", () => {
  const cssExample = `
    :root {
      --hb-color-title: red;
      --text-color:#000;
    }
    @media(min-width: 400px) {
      :root {
        --hb-color-title: blue;
      }
    }
    body {
      --hb-another-color: blue;
      color: var(--hb-color-title);
      font-size: 1rem;
    }
  `.replace(/\s/g, "");
  const { variables, css } = extract(cssExample);

  test("should remove form css", () => {
    const cssExpected = `
      :root {
        --text-color:#000;
      }
      @media(min-width: 400px) {
        :root {
          --hb-color-title: blue;
        }
      }
      body {
        --hb-another-color: blue;
        color: var(--hb-color-title);
        font-size: 1rem;
      }
    `.replace(/\s/g, "");
    expect(css).toBe(cssExpected);
  });

  test("should extract variables", () => {
    const variablesExpected = {
      "--hb-color-title": "red"
    };
    expect(variables).toEqual(variablesExpected);
  });
});
