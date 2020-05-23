import { database } from "../firebase";
export const getCollection = name => database.collection(name)

export * from "./utils"