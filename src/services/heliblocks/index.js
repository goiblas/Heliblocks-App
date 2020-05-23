import { getCollection, handleResponse, handleError } from "./../database";
import firebase from "./../firebase";
export * from "./relatedTo";
const heliblockCollection = getCollection("heliblocks");

export const getHeliblock = async id => {
  const response = await heliblockCollection.doc(id).get();
  return handleResponse(response);
};

export const addHeliblock = async heliblock => {
  try {
    const { id } = await heliblockCollection.add(heliblock);
    return id;
  } catch (error) {
    handleError(error);
  }
};
export const setHeliblock = async (id, heliblock) => {
  try {
    await heliblockCollection.doc(id).update(heliblock);
  } catch (error) {
    handleError(error);
  }
};

export const removeHeliblock = async id => {
  try {
    await heliblockCollection.doc(id).delete();
  } catch (error) {
    handleError(error);
  }
};

export const getCodeExample = async props => {
  const getCode = firebase.functions().httpsCallable("getcode");
  try {
    const res = await getCode({ code: props });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
