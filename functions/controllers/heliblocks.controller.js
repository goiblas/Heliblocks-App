const processSource = require("../services/process-source");
const sanitize = require("../services/sanitize");
const { storage, firestore } = require("firebase-admin");

exports.delete = async function (dataSnapshot, context) {
  const { screenshot, author } = dataSnapshot.data();
  const { id } = context.params;

  if (screenshot) {
    try {
      await storage().bucket().file(`screenshots/${id}.png`).delete();
    } catch (error) {
      console.log(error);
    }
  }

  if (author) {
    firestore()
      .collection("users")
      .doc(author)
      .update({
        heliblocks: firestore.FieldValue.arrayRemove(id),
      });
  }

  return firestore().collection("heliblocks_compiled").doc(id).delete();
};

exports.compile = async function (dataSnapshot, context) {
  if (!dataSnapshot.after.exists) {
    return null;
  }

  const content = dataSnapshot.after.data();

  if (!content.screenshot || content.draft) {
    return null;
  }

  const source = processSource({
    html: sanitize(content.html),
    css: content.css,
  });

  return firestore()
    .collection("heliblocks_compiled")
    .doc(context.params.id)
    .set({
      source: {
        ...source,
        alignment: content.alignment,
      },
      title: content.title,
      createdAt: content.createdAt,
      lastUpdate: content.lastUpdate,
      author: content.author,
      screenshot: content.screenshot,
      tags: content.tags,
      description: content.description,
      restricted: content.restricted,
    });
};
