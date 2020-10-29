const test = require("firebase-functions-test")();
const admin = require("firebase-admin");
const functions = require("../index");

const mockDoc = jest.fn((path) => ({
  set: jest.fn(),
}));

jest.mock("firebase-admin", () => ({
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn(),
  },
  firestore: () => ({
    collection: () => ({
      doc: mockDoc,
    }),
    settings: jest.fn(),
  }),
}));

describe("Firebase App", () => {
  afterAll(() => {
    // clean things up
    test.cleanup();
    jest.restoreAllMocks();
  });

  it("Should initialize firebase App", async () => {
    const wrapped = test.wrap(functions.createUser);
    const testUser = {
      uid: "122",
      displayName: "jesus",
      email: "email@gmail.com",
      photoURL: "avatar.jpg",
    };

    await wrapped(testUser);
    expect(admin.initializeApp).toBeCalled();
  });
});
