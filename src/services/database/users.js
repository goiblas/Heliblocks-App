import { database } from "../firebase";
import { handleResponse } from "./utils" 

const collection =  database.collection("users")

export const getUser = async(id) => {
    const response = await collection.doc(id).get()
    return handleResponse(response);
}

export const setUser = async(id, value ) => {
    const options = {merge: true}
    const response = await collection.doc(id).set(value, options);
    return handleResponse(response);
}

