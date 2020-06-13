const utils = require("../utils");

describe("getLabel", () => {
  test("should capitalize", () => {
    expect(utils.getLabel("title")).toBe("Title");
  });
  test("should replace middle hyphen", () => {
    expect(utils.getLabel("slug-with-hyphen")).toBe("Slug with hyphen");
  });
});
