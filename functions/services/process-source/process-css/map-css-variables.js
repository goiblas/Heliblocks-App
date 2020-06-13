const processors = require("./processors");

function mapCssVariables(variables) {
  return Object.keys(variables).map(name => {
    for (let i = 0; i < processors.length; i++) {
      if (processors[i].test(name)) {
        return processors[i].execute({ value: variables[name], name });
      }
    }
  });
}

module.exports = mapCssVariables;
