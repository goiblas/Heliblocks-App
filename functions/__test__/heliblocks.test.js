const test = require("firebase-functions-test")();
const admin = require("firebase-admin");
const functions = require("../index");
const firestore = admin.firestore();
const storage = admin.storage();
const { aHeliblock } = require("./builders/heliblock.builder");
const { firebaseMock } = require("./__mocks__/firebase");

jest.mock("nanoid", () => {
  return {
    nanoid: jest.fn(() => "id_321"),
  };
});

describe("Heliblocks", () => {
  beforeEach(() => {
    const deleteMock = jest.fn(() => Promise.resolve());
    const fileMock = jest.fn(() => ({
      delete: deleteMock,
    }));
    jest.spyOn(storage, "bucket").mockImplementation(() => ({
      file: fileMock,
    }));
    firebaseMock();
  });
  afterAll(() => {
    // clean things up
    test.cleanup();
    jest.restoreAllMocks();
  });

  describe("compileHeliblock", () => {
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
      const css =
        ":root { --hb-color-text: red} .name { color: var(--hb-color-text) }";
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
        author: heliblock.author,
        createdAt: heliblock.createdAt,
        description: heliblock.description,
        lastUpdate: heliblock.lastUpdate,
        restricted: heliblock.restricted,
        screenshot: heliblock.screenshot,
        source: {
          alignment: heliblock.alignment,
          css:
            ".hb_id_321 {}.hb_id_321  ._name_id_321 { color: var(--hb-color-text) }",
          html: '<div class="_name_id_321">Hello</div>',
          variables: [
            {
              label: "Text",
              type: "color",
              value: "red",
              variable: "--hb-color-text",
            },
          ],
          wrapperClassname: "hb_id_321",
        },
        tags: heliblock.tags,
        title: heliblock.title,
      });
    });
  });

  describe("heliblock delete", () => {
    it("Not should remove screenshot when don't have", async () => {
      const id = "id_01";
      const authorId = "author_01";

      const data = test.firestore.makeDocumentSnapshot({
        author: authorId,
      });
      const wrapped = test.wrap(functions.deleteHeliblock);

      await wrapped(data, { params: { id } });

      expect(storage.bucket().file).not.toHaveBeenCalled();
    });
    it("Not should update the user when don't have", async () => {
      const id = "id_01";

      const data = test.firestore.makeDocumentSnapshot({
        screenshot: null,
        author: null,
      });
      const wrapped = test.wrap(functions.deleteHeliblock);

      await wrapped(data, { params: { id } });

      expect(firestore.collection).not.toHaveBeenCalledWith("users");
    });
    it("should remove screenshot, compiled & update user profile", async () => {
      const id = "id_01";
      const authorId = "author_01";

      const data = test.firestore.makeDocumentSnapshot({
        author: authorId,
        screenshot: "https://image.jpg",
      });
      const wrapped = test.wrap(functions.deleteHeliblock);

      await wrapped(data, { params: { id } });

      expect(storage.bucket().file).toHaveBeenCalledWith(
        `screenshots/${id}.png`
      );
      expect(storage.bucket().file().delete).toHaveBeenCalled();

      expect(firestore.collection).toHaveBeenCalledWith("users");
      expect(firestore.collection().doc).toHaveBeenCalledWith(authorId);
      expect(firestore.collection().doc().update).toHaveBeenCalledWith({
        heliblocks: admin.firestore.FieldValue.arrayRemove(id),
      });

      expect(firestore.collection).toHaveBeenCalledWith("heliblocks_compiled");
      expect(firestore.collection().doc).toHaveBeenCalledWith(id);
      expect(firestore.collection().doc().delete).toHaveBeenCalled();
    });
  });
});
