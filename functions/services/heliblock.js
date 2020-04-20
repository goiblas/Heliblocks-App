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
    tags,
    template,
    theme
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
    this.template = template;
    this.theme = theme;

    this.publicAuthor = {
      displayName: "Unknown",
      photoURL:
        "https://firebasestorage.googleapis.com/v0/b/heliblocks.appspot.com/o/screenshots%2Funknown.png?alt=media&token=39e8f84c-24cd-4610-bdde-e8e16790b68c"
    };
  }
  setAuthor(author) {
    this.publicAuthor = author;
  }
  getPreview() {
    return `<style>${this.css.processed}</style>${this.html.processed}`;
  }
  getPublic() {
    return {
      source: {
        html: this.html.processed,
        css: this.css.processed
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
