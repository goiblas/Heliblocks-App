const test = require("firebase-functions-test")();
const admin = require("firebase-admin");
const functions = require("../index");
const firestore = admin.firestore();
const { aHeliblockCompiled } = require("./builders/heliblock.builder");
const { firebaseMock } = require("./__mocks__/firebase");
const { algoliaIndex } = require("../services/algolia");
jest.mock("../services/algolia");

describe("Algolia", () => {
  beforeEach(() => {
    firebaseMock();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  afterAll(() => {
    // clean things up
    test.cleanup();
    jest.restoreAllMocks();
  });

  describe("Delete", () => {
    it("should remove to algolia", async () => {
      const id = "id_123";
      const wrapped = test.wrap(functions.algoliaDelete);

      await wrapped(null, { params: { id } });
      expect(algoliaIndex.deleteObject).toHaveBeenCalledWith(id);
    });
  });

  describe("Update author", () => {
    it("should not update author when there are no changes", async () => {
      const user = {
        displayName: "",
        heliblocks: ["12"],
        displayName: "Display name",
        photoURL: "avatar.jpg",
      };
      const afterSnapshot = test.firestore.makeDocumentSnapshot(user);
      const beforeSnahpshot = test.firestore.makeDocumentSnapshot(user);

      const wrapped = test.wrap(functions.algoliaUpdateAuthor);

      expect(
        await wrapped(test.makeChange(beforeSnahpshot, afterSnapshot))
      ).toBeNull();
      expect(algoliaIndex.partialUpdateObject).not.toHaveBeenCalled();
    });
    it("should not update author when there are no heliblocks", async () => {
      const afterSnapshot = test.firestore.makeDocumentSnapshot({
        heliblocks: [],
        displayName: "Display name",
        photoURL: "avatar.jpg",
      });
      const beforeSnahpshot = test.firestore.makeDocumentSnapshot({
        heliblocks: [],
        displayName: "",
        photoURL: "",
      });

      const wrapped = test.wrap(functions.algoliaUpdateAuthor);
      expect(
        await wrapped(test.makeChange(beforeSnahpshot, afterSnapshot))
      ).toBeNull();
      expect(algoliaIndex.partialUpdateObject).not.toHaveBeenCalled();
    });

    it("should update author details when there are changes", async () => {
      const userId = "user_123";
      const heliblocks = ["id_1", "id_2"];
      const afterSnapshot = test.firestore.makeDocumentSnapshot({
        displayName: "Display name",
        photoURL: "avatar.jpg",
        heliblocks,
      });
      const beforeSnahpshot = test.firestore.makeDocumentSnapshot({
        displayName: "",
        photoURL: "",
        heliblocks,
      });

      const wrapped = test.wrap(functions.algoliaUpdateAuthor);

      await wrapped(test.makeChange(beforeSnahpshot, afterSnapshot), {
        params: { id: userId },
      });

      expect(algoliaIndex.partialUpdateObject).toHaveBeenCalledTimes(
        heliblocks.length
      );

      for (const [index, heliblockId] of heliblocks.entries()) {
        expect(algoliaIndex.partialUpdateObject.mock.calls[index][0]).toEqual({
          objectID: heliblockId,
          author: {
            id: userId,
            displayName: "Display name",
            photoURL: "avatar.jpg",
          },
        });
      }
    });
  });

  describe("Add", () => {
    it("should exit when is deleted", async () => {
      const notExists = test.firestore.makeDocumentSnapshot(null);
      const exists = test.firestore.makeDocumentSnapshot({});

      const wrapped = test.wrap(functions.algoliaAdd);

      expect(await wrapped(test.makeChange(exists, notExists))).toBeNull();
    });

    it("should exit when is private", async () => {
      const heliblock = aHeliblockCompiled().isPrivate().build();

      const afterSnapshot = test.firestore.makeDocumentSnapshot(heliblock);
      const beforeSnahpshot = test.firestore.makeDocumentSnapshot();

      const wrapped = test.wrap(functions.algoliaAdd);
      expect(
        await wrapped(test.makeChange(beforeSnahpshot, afterSnapshot))
      ).toBeNull();
    });

    it("should add to algolia without author", async () => {
      const authorId = "author_id";

      firestore.collection().doc().get.mockReturnValue({
        exists: false,
      });

      const heliblock = aHeliblockCompiled().withAuthor(authorId).build();

      const afterSnapshot = test.firestore.makeDocumentSnapshot(heliblock);
      const beforeSnahpshot = test.firestore.makeDocumentSnapshot();

      const wrapped = test.wrap(functions.algoliaAdd);
      await wrapped(test.makeChange(beforeSnahpshot, afterSnapshot));

      /* fill author if exists */
      expect(firestore.collection).toHaveBeenCalledWith("users");
      expect(firestore.collection().doc).toHaveBeenCalledWith(authorId);
      expect(firestore.collection().doc().get).toHaveBeenCalled();

      // save object
      expect(algoliaIndex.saveObject).toHaveBeenCalledWith({
        author: {
          displayName: "Unknown",
          id: authorId,
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/heliblocks.appspot.com/o/screenshots%2Funknown.png?alt=media&token=39e8f84c-24cd-4610-bdde-e8e16790b68c",
        },
        createdAt: expect.any(Date),
        lastUpdate: expect.any(Date),
        description: heliblock.description,
        screenshot: heliblock.screenshot,
        source: heliblock.source,
        tags: heliblock.tags,
        title: heliblock.title,
      });
    });
    it("should add to algolia with author", async () => {
      const authorId = "author_id";
      const authorDetails = {
        displayName: "Author Name",
        photoURL: "avatar.jpg",
      };
      firestore
        .collection()
        .doc()
        .get.mockReturnValue({
          exists: true,
          data: jest.fn(() => authorDetails),
        });

      const heliblock = aHeliblockCompiled().withAuthor(authorId).build();

      const afterSnapshot = test.firestore.makeDocumentSnapshot(heliblock);
      const beforeSnahpshot = test.firestore.makeDocumentSnapshot();

      const wrapped = test.wrap(functions.algoliaAdd);
      await wrapped(test.makeChange(beforeSnahpshot, afterSnapshot));

      expect(algoliaIndex.saveObject).toHaveBeenCalledWith({
        author: {
          id: authorId,
          ...authorDetails,
        },
        createdAt: expect.any(Date),
        lastUpdate: expect.any(Date),
        description: heliblock.description,
        screenshot: heliblock.screenshot,
        source: heliblock.source,
        tags: heliblock.tags,
        title: heliblock.title,
      });
    });

    it("should remove when change the visibility", async () => {
      const id = "id_123";
      const heliblock = aHeliblockCompiled().build();
      const heliblockPrivated = aHeliblockCompiled().isPrivate().build();
      const afterSnapshot = test.firestore.makeDocumentSnapshot(
        heliblockPrivated
      );
      const beforeSnahpshot = test.firestore.makeDocumentSnapshot(heliblock);

      const wrapped = test.wrap(functions.algoliaAdd);
      await wrapped(test.makeChange(beforeSnahpshot, afterSnapshot), {
        params: { id },
      });

      expect(algoliaIndex.deleteObject).toHaveBeenCalledWith(id);
      expect(algoliaIndex.saveObject).not.toHaveBeenCalled();
    });
  });
});
