import { database } from "../firebase";

export const usersCollection = database.collection("users");
export const heliblocksCollection = database.collection("heliblocks");
export * from "./utils";
