import {
  getCollection,
  handleError,
  handleResponse,
  addToArray
} from "./../database";

const userCollection = getCollection("users");

export const getUser = async uid => {
  try {
    const response = await userCollection.doc(uid).get();
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const setUser = async (uid, userDetails) => {
  try {
    const options = { merge: true };
    await userCollection.doc(uid).set(userDetails, options);
  } catch (error) {
    handleError(error);
  }
};
export const addHeliblockToUser = (uid, heliblockId) => {
  return userCollection.doc(uid).update({
    heliblocks: addToArray(heliblockId)
  });
};
