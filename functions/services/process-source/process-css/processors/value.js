const { getLabel, getMinMax } = require("../utils");
const PREFIX = "--hb-value-";

module.exports = {
  test: name => name.startsWith(PREFIX),
  execute: ({ name, value }) => {
    const nameSliced = name.slice(PREFIX.length);
    const [min, max] = getMinMax(nameSliced);

    return {
      type: "value",
      label: getLabel(nameSliced),
      variable: name,
      value: parseInt(value),
      min,
      max
    };
  }
};
