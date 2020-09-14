import {
  usersCollection,
  handleError,
  handleResponse,
  addToArray,
} from "./../database";

export const getUser = async (uid) => {
  try {
    const response = await usersCollection.doc(uid).get();
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const setUser = async (uid, userDetails) => {
  try {
    const options = { merge: true };
    await usersCollection.doc(uid).set(userDetails, options);
  } catch (error) {
    handleError(error);
  }
};
export const addHeliblockToUser = (uid, heliblockId) => {
  return usersCollection.doc(uid).update({
    heliblocks: addToArray(heliblockId),
  });
};
