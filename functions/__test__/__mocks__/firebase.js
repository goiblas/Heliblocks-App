const admin = require("firebase-admin");
const firestore = admin.firestore();

exports.firebaseMock = function () {
  jest.mock("firebase-admin");

  const docResult = () => {
    return {
      data: () => null,
      exists: true,
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

  const toDate = jest.fn(() => "timestamp");
  admin.firestore.Timestamp = jest.fn((seconds, nanoseconds) => {
    return { toDate };
  });
};
