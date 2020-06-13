const { getLabel } = require("../utils");
const PREFIX = "--hb-color-";

module.exports = {
  test: name => name.startsWith(PREFIX),
  execute: ({ name, value }) => {
    return {
      type: "color",
      label: getLabel(name.slice(PREFIX.length)),
      variable: name,
      value
    };
  }
};
