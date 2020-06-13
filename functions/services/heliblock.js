const processSource = require("./process-source");

class Heliblock {
  constructor({
    css,
    html,
    title,
    alignment,
    createdAt,
    lastUpdate,
    screenshot,
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
    this.description = description;
    this.tags = tags;

    this.publicAuthor = {
      displayName: "Unknown",
      photoURL:
        "https://firebasestorage.googleapis.com/v0/b/heliblocks.appspot.com/o/screenshots%2Funknown.png?alt=media&token=39e8f84c-24cd-4610-bdde-e8e16790b68c"
    };
  }
  setAuthor(author) {
    this.publicAuthor = author;
  }
  getPublic() {
    const source = processSource({ html: this.html, css: this.css });
    return {
      source: {
        ...source,
        alignment: this.alignment
      },
      title: this.title,
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
