import { database } from "../firebase";

export const usersCollection = database.collection("users");
export const heliblocksCollection = database.collection("heliblocks");
export const customersCollection = database.collection("customers");
export const tokensCollection = database.collection("tokens");
export * from "./utils";
