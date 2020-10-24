const { encode } = require("../services/token");
const { firestore } = require("firebase-admin");
const admin = require("firebase-admin");

exports.generate = async function (dataSnapshot, context) {
  const { uid } = context.auth;

  if (!uid) {
    return null;
  }

  const token = encode(uid);

  return firestore()
    .collection("tokens")
    .doc(uid)
    .set({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      value: token,
    })
    .then(() => ({ token }));
};
