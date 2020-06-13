function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
exports.getLabel = function(slug) {
  const match = slug.match(/^(\d+)-(\d+)-(.*)/);
  if (match) {
    return capitalize(match[3].replace(/\-/g, " "));
  }
  return capitalize(slug.replace(/\-/g, " "));
};

exports.getMinMax = function(name) {
  let min = 0;
  let max = 100;

  const match = name.match(/^(\d+)-(\d+)-(.*)/);
  if (match) {
    min = Number(match[1]);
    max = Number(match[2]);
  }

  return [min, max];
};
