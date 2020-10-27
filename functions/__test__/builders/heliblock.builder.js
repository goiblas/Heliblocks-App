const aHeliblock = (title = "Untitled") => {
  const heliblockBase = {
    additionalLinks: "",
    alignment: "irrelevant",
    author: "P8hbu7BWIxfiuUMmXPoPzVVUVd72",
    createdAt: Date.now(),
    css: "",
    description: "",
    draft: false,
    html: "",
    lastUpdate: Date.now(),
    screenshot: "irrelevant.jpg",
    tags: [],
    title,
  };
  return {
    isDraft() {
      heliblockBase.draft = true;
      return this;
    },
    withHtml(html) {
      heliblockBase.html = html;
      return this;
    },
    withCss(css) {
      heliblockBase.css = css;
      return this;
    },
    withScreenshot(screenshot) {
      heliblockBase.screenshot = screenshot;
      return this;
    },
    build() {
      return heliblockBase;
    },
  };
};

exports.aHeliblock = aHeliblock;
