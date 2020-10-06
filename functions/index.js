const functions = require("firebase-functions");
const admin = require("firebase-admin");
const algoliasearch = require("algoliasearch");
const serviceAccount = require("./config/serviceAccountKey.json");
const {
  algolia_app_id,
  algolia_api_key,
  algolia_index_name,
} = require("./config/algoliaConfig.json");

const algoliaClient = algoliasearch(algolia_app_id, algolia_api_key);
const algoliaIndex = algoliaClient.initIndex(algolia_index_name);
const Heliblock = require("./services/heliblock");
const screenshot = require("./services/screenshot");
const previewGenerator = require("./services/preview-generator");
const sanitize = require("./services/sanitize");
const tokenService = require("./services/token");
const { firestore } = require("firebase-admin");
const axios = require("axios").default;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://heliblocks.firebaseio.com",
  storageBucket: "heliblocks.appspot.com",
});

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });
const refHeliblocks = db.collection("heliblocks");
const refUsers = db.collection("users");
const bucket = admin.storage().bucket();

exports.createUser = functions.auth.user().onCreate(async (user) => {
  let githubURL = "#";

  try {
    const { data } = await axios.get(
      `https://api.github.com/user/${user.providerData[0].uid}`
    );
    githubURL = data.html_url;
  } catch (error) {}

  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set({
      email: user.email,
      displayName:
        user.displayName || user.providerData[0].displayName || "Unknown",
      photoURL: user.photoURL,
      githubURL,
    });
});

exports.generateScreenshot = functions.firestore
  .document("heliblocks/{id}")
  .onWrite(async (change, context) => {
    // Exit when the data is deleted.
    if (!change.after.exists) {
      return null;
    }

    const { html, css, alignment, additionalLinks } = change.after.data();

    const preview = previewGenerator({
      html: sanitize(html),
      css,
      alignment,
      additionalLinks,
    });

    const { id } = context.params;

    const imageBuffer = await screenshot(preview);
    const file = bucket.file(`/screenshots/${id}.png`);
    await file.save(imageBuffer);

    const url = await file.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });

    return refHeliblocks.doc(id).update({ screenshot: url[0] });
  });

exports.addToPrivates = functions.firestore
  .document("heliblocks/{id}")
  .onWrite(async (change, context) => {
    // Exit when the data is deleted.
    if (!change.after.exists) {
      return null;
    }

    const content = change.after.data();

    if (!content.screenshot || content.draft || !content.restricted) {
      return null;
    }

    const heliblock = new Heliblock({
      ...content,
      html: sanitize(content.html),
      css: content.css,
    });

    const snapshotAuthor = await db
      .collection("users")
      .doc(content.author)
      .get();

    if (snapshotAuthor.exists) {
      heliblock.setAuthor({
        id: content.author,
        displayName: snapshotAuthor.data().displayName,
        photoURL: snapshotAuthor.data().photoURL,
      });
    }

    const publicHeliblock = heliblock.getPublic();

    return admin
      .firestore()
      .collection("heliblocks_private")
      .doc(context.params.id)
      .set(publicHeliblock);
  });

exports.changePrivacity = functions.firestore
  .document("heliblocks/{id}")
  .onWrite(async (change, context) => {
    if (!change.after.exists || !change.before.exists) {
      return null;
    }

    const content = change.after.data();
    const before = change.before.data();
    const { id } = context.params;

    if (!before.restricted && content.restricted) {
      return algoliaIndex.deleteObject(id);
    }

    if (before.restricted && !content.restricted) {
      return admin
        .firestore()
        .collection("heliblocks_private")
        .doc(id)
        .delete();
    }

    return null;
  });

exports.addToAlgolia = functions.firestore
  .document("heliblocks/{id}")
  .onWrite(async (change, context) => {
    // Exit when the data is deleted.
    if (!change.after.exists) {
      return null;
    }

    const content = change.after.data();

    // Exit when does not exit screenshot
    if (!content.screenshot || content.draft || content.restricted) {
      return null;
    }

    const heliblock = new Heliblock({
      ...content,
      html: sanitize(content.html),
      css: content.css,
    });

    const snapshotAuthor = await db
      .collection("users")
      .doc(content.author)
      .get();
    if (snapshotAuthor.exists) {
      heliblock.setAuthor({
        id: content.author,
        displayName: snapshotAuthor.data().displayName,
        photoURL: snapshotAuthor.data().photoURL,
      });
    }

    const publicHeliblock = heliblock.getPublic();
    return algoliaIndex.saveObject({
      objectID: context.params.id,
      ...publicHeliblock,
    });
  });

exports.removeCreation = functions.firestore
  .document("heliblocks/{id}")
  .onDelete(async (snapshot, context) => {
    const { screenshot, author } = snapshot.data();
    const { id } = context.params;

    if (screenshot) {
      await bucket.file(`/screenshots/${id}.png`).delete();
    }

    if (author) {
      refUsers.doc(author).update({
        heliblocks: admin.firestore.FieldValue.arrayRemove(id),
      });
    }

    if (snapshot.data().restricted) {
      return admin
        .firestore()
        .collection("heliblocks_private")
        .doc(id)
        .delete();
    } else {
      return algoliaIndex.deleteObject(id);
    }
  });

exports.updateAuthorToAlgolia = functions.firestore
  .document("users/{id}")
  .onWrite(async (change, context) => {
    // Exit when the data is deleted.
    if (!change.after.exists) {
      return null;
    }
    const user = change.after.data();

    // Exit when does have heliblocks
    if (!user.heliblocks || user.heliblocks.length === 0) {
      return null;
    }

    const previousUser = change.before.data();

    function hasChanges(previous, current) {
      return (
        previous.photoURL !== current.photoURL ||
        previous.displayName !== current.displayName
      );
    }

    // Only update when has changes
    if (hasChanges(previousUser, user)) {
      const promises = user.heliblocks.map((id) => {
        return algoliaIndex.partialUpdateObject({
          objectID: id,
          author: {
            id: context.params.id,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
        });
      });
      return Promise.all(promises);
    }
    return null;
  });

exports.generateToken = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;

  if (!uid) {
    return null;
  }

  const token = tokenService.encode(uid);

  return admin
    .firestore()
    .collection("tokens")
    .doc(uid)
    .set({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      value: token,
    })
    .then(() => {
      return { token };
    });
});

async function isPro(uid) {
  try {
    const snapshot = await db
      .collection("customers")
      .doc(uid)
      .collection("subscriptions")
      .where("status", "in", ["trialing", "active"])
      .get();

    const doc = snapshot.docs[0];
    return doc.data().role === "pro";
  } catch (err) {
    return false;
  }
}

const cors = require("cors")({ origin: true });

exports.api = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
      const token = req.headers.authorization.split(" ")[1];
      const uid = await tokenService.decode(token);

      const snapshotToken = await db.collection("tokens").doc(uid).get();

      if (snapshotToken.exists) {
        const snapshotUser = await db.collection("users").doc(uid).get();

        if (snapshotUser.exists) {
          const { heliblocks, displayName, photoURL } = snapshotUser.data();
          const isUserPro = await isPro(uid);

          const rawHeliblocks = await Promise.all(
            heliblocks.map((id) =>
              refHeliblocks
                .doc(id)
                .get()
                .then((doc) => (doc.exists ? { id, ...doc.data() } : null))
            )
          );
          const allHeliblocks = rawHeliblocks.filter(
            (heliblock) => heliblock && heliblock.draft !== true
          );
          /*
          let firstPrivate = false;
          const rawPublicHeliblocks = await Promise.all(
            allHeliblocks.map((heliblock) => {
              if (heliblock.private) {
                if (firstPrivate || !isUserPro) {
                  return null;
                }
                firstPrivate = true;
                return admin
                  .firestore()
                  .collection("heliblocks_private")
                  .doc(heliblock.id)
                  .get()
                  .then((privateBlock) => {
                    if (privateBlock.exists) {
                      return {
                        objectID: heliblock.id,
                        ...privateBlock.data(),
                      };
                    } else {
                      return null;
                    }
                  });
              }

              return algoliaIndex.getObject(heliblock.id);
            })
          );
            */
          // const publicHeliblocks = rawPublicHeliblocks.filter(Boolean);

          res.json({
            displayName,
            photoURL,
            heliblocks: allHeliblocks,
            pro: isUserPro,
          });
        } else {
          res.status(500).send({ error: "Invalid token" });
        }
      } else {
        res.status(500).send({ error: "Invalid token" });
      }
    } catch (error) {
      res.status(500).send({ error: "Invalid autenticacion" });
    }
  });
});
