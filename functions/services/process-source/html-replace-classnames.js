const cheerio = require("cheerio");

function htmlParser(html, mapping) {
  const $ = cheerio.load(html);

  Object.keys(mapping).forEach(className => {
    $("." + className)
      .addClass(mapping[className])
      .removeClass(className);
  });
  return $("body").html();
}

module.exports = htmlParser;
