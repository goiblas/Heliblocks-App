const test = require("firebase-functions-test")();
const admin = require("firebase-admin");
const functions = require("../index");
const axios = require("axios").default;
const firestore = admin.firestore();
const { aUser } = require("./builders/user.builder");
jest.mock("axios");

describe("onUserCreate", () => {
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

  it("should save new user in users collection", async () => {
    const wrapped = test.wrap(functions.createUser);
    const userID = "id_1";
    const providerId = "provider_id_01";
    const testUser = aUser(userID).withProviderId(providerId).build();

    const githubURL = "https://github.com/goiblas";
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          html_url: githubURL,
        },
      })
    );

    await wrapped(testUser);
    // check it returns mocked value as expected
    expect(firestore.collection).toHaveBeenCalledWith("users");
    expect(firestore.collection().doc).toHaveBeenCalledWith(userID);

    expect(axios.get).toBeCalledWith(
      `https://api.github.com/user/${providerId}`
    );
    expect(firestore.collection().doc().set).toBeCalledWith({
      displayName: testUser.displayName,
      email: testUser.email,
      photoURL: testUser.photoURL,
      githubURL: githubURL,
    });
  });

  it("should save with githubURL `#` when github throw error", async () => {
    const wrapped = test.wrap(functions.createUser);

    const testUser = aUser("1").build();
    axios.get.mockImplementationOnce(() => Promise.reject());

    await wrapped(testUser);

    expect(firestore.collection().doc().set).toBeCalledWith({
      displayName: testUser.displayName,
      email: testUser.email,
      photoURL: testUser.photoURL,
      githubURL: "#",
    });
  });
});
