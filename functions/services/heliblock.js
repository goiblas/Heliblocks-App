const previewGenerator = require("./previewGenerator/index");

class Heliblock {
  constructor({
    css,
    html,
    title,
    alignment,
    createdAt,
    lastUpdate,
    screenshot,
    author,
    description,
    tags
  }) {
    this.css = css;
    this.html = html;
    this.title = title;
    this.alignment = alignment;
    this.createdAt = createdAt;
    this.lastUpdate = lastUpdate;
    this.screenshot = screenshot;
    this.author = author;
    this.description = description;
    this.tags = tags;

    this.publicAuthor = {
      displayName: "Unknown",
      photoURL:
        "https://firebasestorage.googleapis.com/v0/b/heliblocks.appspot.com/o/screenshots%2Funknown.png?alt=media&token=39e8f84c-24cd-4610-bdde-e8e16790b68c"
    };
  }
  _sourceProcess(source) {
    const { minify } = require("html-minifier");
    const sanitizeHtml = require("sanitize-html");

    // https://www.npmjs.com/package/sanitize-html
    const sanitizeOptions = {
      allowedAttributes: false,
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "h1",
        "h2",
        "img",
        "picture",
        "video"
      ]),
      allowedClasses: false
    };

    const sanitized = sanitizeHtml(source, sanitizeOptions);

    // https://www.npmjs.com/package/html-minifier
    const minifyOptions = {
      collapseWhitespace: true,
      removeComments: true
    };
    return minify(sanitized, minifyOptions);
  }
  _getAlignmentClass() {
    return;
  }
  setAuthor(author) {
    this.publicAuthor = author;
  }
  getPreview() {
    const { source, alignment } = this.getPublic();
    const previewConfig = {
      html: source.html,
      css: source.css,
      alignment
    };
    return previewGenerator(previewConfig);
  }
  getPublic() {
    return {
      source: {
        html: this._sourceProcess(this.html),
        css: this._sourceProcess(this.css)
      },
      title: this.title,
      alignment: this.alignment,
      createdAt: this.createdAt,
      lastUpdate: this.lastUpdate,
      author: this.publicAuthor,
      screenshot: this.screenshot,
      tags: this.tags,
      description: this.description
    };
  }
}

module.exports = Heliblock;
