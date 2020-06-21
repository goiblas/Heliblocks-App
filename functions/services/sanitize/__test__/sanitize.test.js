const sanitize = require("..");

describe("Sanitize", () => {
  test("should remove unsafe tags", () => {
    const htmlUnsafed =
      '<div><script>console.log("hello!")</script><h1>World</h1></div>';
    const htmlExpected = "<div><h1>World</h1></div>";

    expect(sanitize(htmlUnsafed)).toBe(htmlExpected);
  });

  test("should allow attributes", () => {
    const htmlLink = '<a href="#" aria-hidden="true" target="_blank">Link</a>';
    expect(sanitize(htmlLink)).toBe(htmlLink);
  });

  test("should allow youtube iframe", () => {
    const htmlIframe =
      '<p><iframe src="https://www.youtube.com/embed/nykIhs12345"></iframe><iframe src="https://heliblocks.com"></iframe></p>';
    const htmlExpected =
      '<p><iframe src="https://www.youtube.com/embed/nykIhs12345"></iframe><iframe></iframe></p>';

    expect(sanitize(htmlIframe)).toBe(htmlExpected);
  });

  test("should not allow data src", () => {
    const htmlSrcData =
      '<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="  >';
    expect(sanitize(htmlSrcData)).toBe("<img>");
  });

  test("should allow svg", () => {
    const htmlSvg =
      '<svg viewbox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="50"></circle></svg>';
    expect(sanitize(htmlSvg)).toBe(htmlSvg);
  });
  test("should allow camel case tag", () => {
    const htmlSvgCamelCase =
      '<svg viewbox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><linearGradient gradientTransform="rotate(90)"><stop offset="5%" stop-color="gold"></stop><stop offset="95%" stop-color="red"></stop></linearGradient></svg>';
    const htmlExpected =
      '<svg viewbox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><lineargradient gradienttransform="rotate(90)"><stop offset="5%" stop-color="gold"></stop><stop offset="95%" stop-color="red"></stop></lineargradient></svg>';
    expect(sanitize(htmlSvgCamelCase)).toBe(htmlExpected);
  });
});
