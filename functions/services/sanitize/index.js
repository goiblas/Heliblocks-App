const { minify } = require("html-minifier");
const sanitizeHtml = require("sanitize-html");
const svgTags = require("./safeSvgTags");

const allowedTags = [
  ...sanitizeHtml.defaults.allowedTags,
  ...svgTags.map(tag => tag.toLowerCase()),
  "h1",
  "h2",
  "img",
  "picture",
  "video",
  "iframe",
  "section",
  "label",
  "input",
  "main",
  "aside",
  "footer",
  "button",
  "article",
  "details",
  "summary",
  "hgroup",
  "fieldset",
  "legend",
  "meter"   
];
// https://www.npmjs.com/package/sanitize-html
const sanitizeOptions = {
  allowedAttributes: false,
  allowedTags: allowedTags,
  allowedClasses: false,
  allowedIframeHostnames: ["www.youtube.com", "player.vimeo.com"]
};

// https://www.npmjs.com/package/html-minifier
const minifyOptions = {
  collapseWhitespace: true,
  removeComments: true
};

function sanitize(source) {
  const sanitized = sanitizeHtml(source, sanitizeOptions);
  return minify(sanitized, minifyOptions);
}

module.exports = sanitize;
