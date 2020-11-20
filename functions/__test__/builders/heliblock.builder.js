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
    restricted: false,
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

const aHeliblockCompiled = (title = "Untitled") => {
  const heliblockCompiledBase = {
    author: "P8hbu7BWIxfiuUMmXPoPzVVUVd72",
    createdAt: {
      _seconds: 10000,
      _nanoseconds: 100000,
    },
    lastUpdate: {
      _seconds: 10000,
      _nanoseconds: 100000,
    },
    source: {
      alignment: "",
      html: "",
      css: "",
      wrapperClassname: "",
      variables: [],
    },
    description: "",
    screenshot: "irrelevant.jpg",
    tags: [],
    title,

    restricted: false,
  };
  return {
    isPrivate() {
      heliblockCompiledBase.restricted = true;
      return this;
    },
    withAuthor(authorId) {
      heliblockCompiledBase.author = authorId;
      return this;
    },
    build() {
      return heliblockCompiledBase;
    },
  };
};

exports.aHeliblockCompiled = aHeliblockCompiled;
