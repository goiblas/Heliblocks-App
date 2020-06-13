const postcss = require("postcss");
const parser = require("postcss-selector-parser");
const scopeCss = require("scope-css");

function wrapCss(css, wrapper) {
  const animationScope = wrapper.replace(".", "") + "-";
  return scopeCss(css, wrapper, animationScope, { keyframes: true });
}

function scope(css, { hash, wrapper }) {
  const root = postcss.parse(css);
  const replaced = {};

  function renameClassNode(className) {
    const newClassName = `_${className}_${hash}`;
    replaced[className] = newClassName;
    return newClassName;
  }
  function isRoot(node) {
    return node.value === ":root" || node.value === "html";
  }
  function renameNodes(nodes) {
    return nodes.map(function(node) {
      // replace root selector
      if (isRoot(node)) {
        node.value = wrapper;
      }
      if (node.type === "class") {
        node.value = renameClassNode(node.value);
      } else if (node.type === "pseudo" && node.value === ":not") {
        // Process ":not([selector])" pseudo node
        renameNodes(node.nodes);
      } else if (node.type === "selector") {
        // Rename selector nodes
        renameNodes(node.nodes);
      }
      return node;
    });
  }

  function renameSelector(selector) {
    function splittedSelector(chunks) {
      chunks.map(({ nodes }) => renameNodes(nodes));
    }
    return parser(splittedSelector).processSync(selector);
  }

  root.walkRules(rule => {
    rule.selectors = rule.selectors.map(renameSelector);
  });

  return {
    css: wrapCss(root.toString(), wrapper),
    replaced
  };
}

module.exports = scope;
