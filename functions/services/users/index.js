const { firestore } = require("firebase-admin");

async function isUserPro(uid) {
  try {
    const snapshot = await firestore()
      .collection("customers")
      .doc(uid)
      .collection("subscriptions")
      .where("status", "==", "active")
      .get();

    return !snapshot.empty;
  } catch (err) {
    return false;
  }
}

module.exports = {
  isUserPro,
};
