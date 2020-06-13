const { getLabel } = require("../utils");
const PREFIX = "--hb-text-";

module.exports = {
  test: name => name.startsWith(PREFIX),
  execute: ({ name, value }) => {
    return {
      type: "text",
      label: getLabel(name.slice(PREFIX.length)),
      variable: name,
      value
    };
  }
};
