const { getLabel, getMinMax } = require("../utils");
const PREFIX = "--hb-size-";

function getUnit(value) {
  return value.replace(/\d/g, "");
}

module.exports = {
  test: name => name.startsWith(PREFIX),
  execute: ({ name, value }) => {
    const nameSliced = name.slice(PREFIX.length);
    const [min, max] = getMinMax(nameSliced);

    return {
      type: "size",
      label: getLabel(nameSliced),
      variable: name,
      value: parseInt(value),
      unit: getUnit(value),
      min,
      max
    };
  }
};
