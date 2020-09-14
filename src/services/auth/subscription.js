import { customersCollection } from "services/database";

export const listenSubcription = (uid, callback) => {
  return customersCollection
    .doc(uid)
    .collection("subscriptions")
    .where("status", "in", ["trialing", "active"])
    .onSnapshot(async (snapshot) => {
      // In this implementation we only expect one active or trialing subscription to exist.
      if (snapshot.empty) {
        callback({
          subcription: false,
        });
      } else {
        const doc = snapshot.docs[0];
        console.log(doc.id, " => ", doc.data());
        callback({
          subcription: true,
        });
      }
    });
};
