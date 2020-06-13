const extractCssVarialbes = require("./extract-css-variables");
const mapCssVariables = require("./map-css-variables");
const scopeCss = require("./scope-css");

function parseCss(originCss, config) {
  const {
    css: cssWithoutVariables,
    variables: variablesExtracted
  } = extractCssVarialbes(originCss);

  const { css, replaced } = scopeCss(cssWithoutVariables, config);

  return {
    replacedMapping: replaced,
    variables: mapCssVariables(variablesExtracted),
    css
  };
}

module.exports = parseCss;
