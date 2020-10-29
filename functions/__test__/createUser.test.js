const test = require("firebase-functions-test")();
const admin = require("firebase-admin");
const functions = require("../index");
const axios = require("axios").default;
const firestore = admin.firestore();
const { aUser } = require("./builders/user.builder");
jest.mock("axios");

const { firebaseMock } = require("./__mocks__/firebase");

describe("onUserCreate", () => {
  beforeEach(() => {
    firebaseMock();
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
