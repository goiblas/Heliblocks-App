const test = require("firebase-functions-test")();
const admin = require("firebase-admin");
const functions = require("../index");
const firestore = admin.firestore();
const storage = admin.storage();
const { aHeliblock } = require("./builders/heliblock.builder");
const { firebaseMock } = require("./__mocks__/firebase");

const screenshot = require("../services/screenshot");
jest.mock("../services/screenshot");

const saveMock = jest.fn(() => Promise.resolve());
const getSignedUrlMock = jest.fn();
const fileMock = jest.fn(() => ({
  save: saveMock,
  getSignedUrl: getSignedUrlMock,
}));

jest.spyOn(storage, "bucket").mockImplementation(() => ({
  file: fileMock,
}));

describe("Screenshot", () => {
  beforeEach(() => {
    firebaseMock();
  });
  afterAll(() => {
    // clean things up
    test.cleanup();
    jest.restoreAllMocks();
  });

  it("should exit when is deleted ", async () => {
    const notExists = test.firestore.makeDocumentSnapshot(null);
    const exists = test.firestore.makeDocumentSnapshot({});

    const wrapped = test.wrap(functions.generateScreenshot);

    expect(await wrapped(test.makeChange(exists, notExists))).toBeNull();
    expect(firestore.collection).not.toHaveBeenCalled();
    expect(storage.bucket().file).not.toHaveBeenCalled();
  });

  it("should save screenshot generated", async () => {
    const imageUrlMock = "url.jpg";
    const imagenBufferMock = "bufferImage";
    const id = "id_01";

    getSignedUrlMock.mockResolvedValue([imageUrlMock]);
    screenshot.mockResolvedValue(imagenBufferMock);

    const heliblock = aHeliblock().build();
    const afterSnapshot = test.firestore.makeDocumentSnapshot(heliblock);
    const beforeSnahpshot = test.firestore.makeDocumentSnapshot();

    const wrapped = test.wrap(functions.generateScreenshot);
    await wrapped(test.makeChange(beforeSnahpshot, afterSnapshot), {
      params: { id },
    });

    expect(storage.bucket().file).toHaveBeenCalledWith(`screenshots/${id}.png`);
    expect(saveMock).toHaveBeenCalledWith(imagenBufferMock);
    expect(getSignedUrlMock).toHaveBeenCalledWith(
      expect.objectContaining({
        action: expect.any(String),
        expires: expect.any(String),
      })
    );
    expect(firestore.collection).toHaveBeenCalledWith("heliblocks");
    expect(firestore.collection().doc).toHaveBeenCalledWith(id);
    expect(firestore.collection().doc().update).toHaveBeenCalledWith({
      screenshot: imageUrlMock,
    });
  });
});
