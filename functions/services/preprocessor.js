const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var cors = require("cors");

app.use(bodyParser.json());
app.use(cors({ origin: true }));

const sass = require("node-sass");
const sanitizeHtml = require("sanitize-html");
const { minify } = require("html-minifier");

module.exports = app.post("/", (req, res) => {
  const { preprocessor, code } = req.body;

  try {
    const result = preprocessorFactory(preprocessor, code);
    res.status(200).json({ success: true, code: result });
  } catch (error) {
    res.status(200).json({ success: false, error: error.message });
  }
});

function preprocessorFactory(preprocessor, code) {
  switch (preprocessor) {
    case "sass":
    case "scss":
      const { css } = sass.renderSync({
        data: code,
        outputStyle: "compressed"
      });
      return css.toString();
    case "html":
      return htmlProcessor(code);
    default:
      return code;
  }
}

function htmlProcessor(html) {
  // https://www.npmjs.com/package/sanitize-html
  const sanitizeOptions = {
    allowedAttributes: false,
    allowedTags: false,
    allowedClasses: false
  };
  const sanitized = sanitizeHtml(html, sanitizeOptions);

  // https://www.npmjs.com/package/html-minifier
  const minifyOptions = {
    collapseWhitespace: true,
    removeComments: true
  };
  return minify(sanitized, minifyOptions);
}
