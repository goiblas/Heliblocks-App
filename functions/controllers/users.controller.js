const { firestore } = require("firebase-admin");
const axios = require("axios").default;

exports.create = async function (user) {
  let githubURL = "#";

  try {
    const { data } = await axios.get(
      `https://api.github.com/user/${user.providerData[0].uid}`
    );
    githubURL = data.html_url;
  } catch (error) {}

  return firestore()
    .collection("users")
    .doc(user.uid)
    .set({
      email: user.email,
      displayName:
        user.displayName || user.providerData[0].displayName || "Unknown",
      photoURL: user.photoURL,
      githubURL,
    });
};
