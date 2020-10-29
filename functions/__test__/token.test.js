const test = require("firebase-functions-test")();
const admin = require("firebase-admin");
const functions = require("../index");
const firestore = admin.firestore();
const { firebaseMock } = require("./__mocks__/firebase");

describe("Tokens generate", () => {
  beforeEach(() => {
    firebaseMock();
  });
  afterAll(() => {
    // clean things up
    test.cleanup();
    jest.restoreAllMocks();
  });

  it("should return token only when recibe user uid", async () => {
    const context = {
      auth: {},
    };
    const wrapped = test.wrap(functions.generateToken);

    expect(await wrapped(null, context)).toBeNull();
  });

  it("should generate a valid token", async () => {
    const context = {
      auth: { uid: "aaa" },
    };

    const wrapped = test.wrap(functions.generateToken);

    const { token } = await wrapped({}, context);
    expect(token).toMatch(/^\S+\.\S+\.\S+$/);
  });

  it("should save user token", async () => {
    const uid = "11a";
    const context = {
      auth: { uid },
    };

    const wrapped = test.wrap(functions.generateToken);

    // generate token
    const { token } = await wrapped(null, context);

    // save user token
    expect(firestore.collection).toBeCalledWith("tokens");
    expect(firestore.collection().doc).toBeCalledWith(uid);
    expect(firestore.collection().doc().set).toBeCalledWith({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      value: token,
    });
  });
});
