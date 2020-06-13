const Heliblock = require("./heliblock");
const processSource = require("./process-source");
jest.mock("./process-source", () => {
  return jest.fn().mockImplementation(source => {
    return {
      html: source.html,
      css: source.css,
      variables: [],
      wrapperClassname: ""
    };
  });
});

describe("Heliblock initial value", () => {
  const initialValue = {
    alignment: "normal",
    author: "u2lSmXX6qzVRJMwTFhT4UEX2oUu2",
    description: "",
    createdAt: new Date(),
    publised: true,
    lastUpdate: new Date(),
    screenshot: "preview.jpg",
    tags: [],
    template: null,
    theme: "twentynineteen",
    title: "title",
    html: "html",
    css: "css"
  };

  let heliblock;

  beforeEach(() => {
    heliblock = new Heliblock(initialValue);
  });
  test("should get public", () => {
    const sharedProps = {
      title: expect.any(String),
      description: expect.any(String),
      tags: expect.any(Array),
      lastUpdate: expect.any(Date),
      createdAt: expect.any(Date),
      screenshot: expect.any(String),
      source: expect.objectContaining({
        wrapperClassname: expect.any(String),
        alignment: expect.any(String),
        variables: expect.any(Array),
        html: expect.stringMatching("html"),
        css: expect.stringMatching("css")
      })
    };
    const withoutAuthorExpected = expect.objectContaining({
      ...sharedProps,
      author: expect.objectContaining({
        displayName: expect.stringMatching("Unknown"),
        photoURL: expect.any(String)
      })
    });
    expect(heliblock.getPublic()).toEqual(withoutAuthorExpected);
    const author = {
      displayName: "Author Name",
      photoURL: ""
    };

    heliblock.setAuthor(author);
    const withAuthorExpected = expect.objectContaining({
      ...sharedProps,
      author: expect.objectContaining({
        displayName: expect.stringMatching(author.displayName),
        photoURL: expect.any(String)
      })
    });
    expect(heliblock.getPublic()).toEqual(withAuthorExpected);
    expect(processSource).toBeCalled();
  });
});
