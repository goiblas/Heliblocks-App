const mapCssVariables = require("../map-css-variables");

describe("Map Css Variables", () => {
  describe("Colors", () => {
    test("should get one color", () => {
      const colorsVars = {
        "--hb-color-text": "#222222"
      };
      const mapExpected = [
        {
          type: "color",
          label: "Text",
          variable: "--hb-color-text",
          value: "#222222"
        }
      ];
      expect(mapCssVariables(colorsVars)).toEqual(mapExpected);
    });
  });
  describe("text", () => {
    test("should get text", () => {
      const textVar = {
        "--hb-text-family-heading": "Arial"
      };
      const mapExpected = [
        {
          type: "text",
          label: "Family heading",
          variable: "--hb-text-family-heading",
          value: "Arial"
        }
      ];
      expect(mapCssVariables(textVar)).toEqual(mapExpected);
    });
  });
  describe("size", () => {
    test("should get sizes", () => {
      const sizeVars = {
        "--hb-size-font-size-heading": "30px",
        "--hb-size-10-80-columns-gap": "60px"
      };
      const mapExpected = [
        {
          type: "size",
          label: "Font size heading",
          variable: "--hb-size-font-size-heading",
          value: 30,
          unit: "px",
          min: 0,
          max: 100
        },
        {
          type: "size",
          label: "Columns gap",
          variable: "--hb-size-10-80-columns-gap",
          value: 60,
          unit: "px",
          min: 10,
          max: 80
        }
      ];
      expect(mapCssVariables(sizeVars)).toEqual(mapExpected);
    });
  });
  describe("Value", () => {
    test("should get value", () => {
      const valueVar = {
        "--hb-value-10-80-columns-gap": "60"
      };
      const mapExpected = [
        {
          type: "value",
          label: "Columns gap",
          variable: "--hb-value-10-80-columns-gap",
          value: 60,
          min: 10,
          max: 80
        }
      ];
      expect(mapCssVariables(valueVar)).toEqual(mapExpected);
    });
  });
});
