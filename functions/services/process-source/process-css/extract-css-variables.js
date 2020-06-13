const postcss = require("postcss");

// https://github.com/nkt/css-variables-parser
function isOutsideRoot(rule) {
  return (
    rule.selectors.length !== 1 ||
    rule.selectors[0] !== ":root" ||
    rule.parent.type !== "root"
  );
}

function extractVariables(css, options = { prefix: "--hb-" }) {
  function isVariableDeclaration(decl) {
    return Boolean(decl.value) && decl.prop.startsWith(options.prefix);
  }
  const root = postcss.parse(css);

  const variables = {};
  root.walkRules(rule => {
    if (isOutsideRoot(rule)) {
      return;
    }
    rule.each(decl => {
      if (isVariableDeclaration(decl)) {
        variables[decl.prop] = decl.value;
        rule.removeChild(decl);
      }
    });
  });

  return {
    css: root.toString(),
    variables
  };
}

module.exports = extractVariables;
