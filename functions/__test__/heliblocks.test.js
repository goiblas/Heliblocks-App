const test = require("firebase-functions-test")();
const admin = require("firebase-admin");
const functions = require("../index");
const firestore = admin.firestore();
const { aHeliblock } = require("./builders/heliblock.builder");
const { nanoid } = require("nanoid");

jest.mock("nanoid", ()=> {
  return {
    nanoid: jest.fn(() => "id_321")
  }
})

describe("compileHeliblock", () => {
  beforeEach(() => {
    var docData = undefined;
    var docExists = true;
    const docResult = () => {
      return {
        data: () => docData,
        exists: docExists,
      };
    };
    firestore.collection = jest.fn((docname) => ({ doc }));

    const doc = jest.fn((docname) => {
      return { update, get, set, delete: deleteFn };
    });
    const get = jest.fn(() => Promise.resolve(docResult()));
    const update = jest.fn((updateValue) => Promise.resolve(true));
    const set = jest.fn((setValue) => Promise.resolve(true));
    const deleteFn = jest.fn((setValue) => Promise.resolve(true));

    admin.firestore.FieldValue.arrayUnion = jest.fn((val) => {
      return val;
    });
    admin.firestore.FieldValue.arrayRemove = jest.fn((val) => {
      return val;
    });
  });
  afterAll(() => {
    // clean things up
    test.cleanup();
    jest.restoreAllMocks();
  });

  it("should exit when is deleted ", async () => {
    const notExists = test.firestore.makeDocumentSnapshot(null);
    const exists = test.firestore.makeDocumentSnapshot({});

    const wrapped = test.wrap(functions.compileHeliblock);

    expect(await wrapped(test.makeChange(exists, notExists))).toBeNull();
    expect(firestore.collection).not.toHaveBeenCalled();
  });

  it("should exit when has not screenshot", async () => {
    const heliblock = aHeliblock().withScreenshot(null).build();
    const afterSnapshot = test.firestore.makeDocumentSnapshot(heliblock);
    const beforeSnahpshot = test.firestore.makeDocumentSnapshot();
    const wrapped = test.wrap(functions.compileHeliblock);

    expect(
      await wrapped(test.makeChange(beforeSnahpshot, afterSnapshot))
    ).toBeNull();
    expect(firestore.collection).not.toHaveBeenCalled();
  });

  it("should exit when is draft", async () => {

    const heliblock = aHeliblock().isDraft().build();
    const afterSnapshot = test.firestore.makeDocumentSnapshot(heliblock);
    const beforeSnahpshot = test.firestore.makeDocumentSnapshot();
    const wrapped = test.wrap(functions.compileHeliblock);

    expect(
      await wrapped(test.makeChange(beforeSnahpshot, afterSnapshot))
    ).toBeNull();
    expect(firestore.collection).not.toHaveBeenCalled();
  });

  it("should compile & save in compiled collection", async () => {
    const htmlUnsafed = `
        <script>
            console.log("hello!")
        </script>
        <div class="name">Hello</div>
        `;
      const css = ":root { --hb-color-text: red} .name { color: var(--hb-color-text) }"
    const id = "id_01";

    const heliblock = aHeliblock().withHtml(htmlUnsafed).withCss(css).build();
    const afterSnapshot = test.firestore.makeDocumentSnapshot(heliblock);
    const beforeSnahpshot = test.firestore.makeDocumentSnapshot();

    const wrapped = test.wrap(functions.compileHeliblock);
    await wrapped(test.makeChange(beforeSnahpshot, afterSnapshot), {
      params: { id },
    });

    expect(firestore.collection).toHaveBeenCalledWith("heliblocks_compiled");
    expect(firestore.collection().doc).toHaveBeenCalledWith(id);
    expect(firestore.collection().doc().set).toHaveBeenCalledWith({
      "author": heliblock.author,
       "createdAt": heliblock.createdAt,
       "description": heliblock.description,
       "lastUpdate": heliblock.lastUpdate,
       "restricted": heliblock.restricted,
       "screenshot": heliblock.screenshot,
       "source":  {
         "alignment": heliblock.alignment,
         "css": ".hb_id_321 {}.hb_id_321  ._name_id_321 { color: var(--hb-color-text) }",
         "html": "<div class=\"_name_id_321\">Hello</div>",
         "variables":  [
            {
             "label": "Text",
             "type": "color",
             "value": "red",
             "variable": "--hb-color-text",
           },
         ],
         "wrapperClassname": "hb_id_321",
       },
       "tags": heliblock.tags,
       "title": heliblock.title,
    });
  });
});
