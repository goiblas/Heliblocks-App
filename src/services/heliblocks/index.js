import {
  handleResponse,
  handleError,
  heliblocksCollection
} from "./../database";
export * from "./relatedTo";

export const getHeliblock = async id => {
  console.log();
  const response = await heliblocksCollection.doc(id).get();
  return handleResponse(response);
};

export const addHeliblock = async heliblock => {
  try {
    const { id } = await heliblocksCollection.add(heliblock);
    return id;
  } catch (error) {
    handleError(error);
  }
};
export const setHeliblock = async (id, heliblock) => {
  try {
    await heliblocksCollection.doc(id).update(heliblock);
  } catch (error) {
    handleError(error);
  }
};

export const removeHeliblock = async id => {
  try {
    await heliblocksCollection.doc(id).delete();
  } catch (error) {
    handleError(error);
  }
};
