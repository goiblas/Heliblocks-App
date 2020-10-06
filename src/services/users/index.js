import {
  usersCollection,
  handleError,
  handleResponse,
  addToArray,
  tokensCollection,
} from "./../database";

import firebase from "./../firebase";
export const generateToken = async () => {
  try {
    const generateTokenService = firebase
      .functions()
      .httpsCallable("generateToken");
    const { data } = await generateTokenService();
    return data;
  } catch (error) {}

  return { token: "" };
};

export const getToken = async (id) => {
  try {
    const response = await tokensCollection.doc(id).get();
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

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
