const processCss = require("./process-css");
const replaceClassnames = require("./html-replace-classnames");
const { nanoid } = require("nanoid");

function parse({ html, css }) {
  const hash = nanoid(8);
  const wrapper = "hb_" + hash;

  let replacedMapping = {};
  let cssProcessed = css;
  let variables = [];

  try {
    const result = processCss(css, {
      wrapper: "." + wrapper,
      hash
    });

    replacedMapping = result.replacedMapping;
    cssProcessed = result.css;
    variables = result.variables;
  } catch (error) {}

  const htmlProcessed = replaceClassnames(html, replacedMapping);

  return {
    html: htmlProcessed,
    css: cssProcessed,
    variables,
    wrapperClassname: wrapper
  };
}

module.exports = parse;
