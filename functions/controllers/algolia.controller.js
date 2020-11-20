const { firestore } = require("firebase-admin");
const { algoliaIndex } = require("../services/algolia");

const unknownUser = {
  displayName: "Unknown",
  photoURL:
    "https://firebasestorage.googleapis.com/v0/b/heliblocks.appspot.com/o/screenshots%2Funknown.png?alt=media&token=39e8f84c-24cd-4610-bdde-e8e16790b68c",
};

function hasChangedToPrivate(snapshot) {
  if (!snapshot.before.exists) {
    return false;
  }

  const content = snapshot.after.data();
  const before = snapshot.before.data();

  return !before.restricted && content.restricted;
}

exports.updateAuthor = async function (dataSnapshot, context) {
  // Exit when the data is deleted.
  if (!dataSnapshot.after.exists) {
    return null;
  }
  const user = dataSnapshot.after.data();

  // Exit when does have heliblocks
  if (!user.heliblocks || user.heliblocks.length === 0) {
    return null;
  }

  const previousUser = dataSnapshot.before.data();

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
};

exports.delete = async function (dataSnapshot, context) {
  const { id } = context.params;
  return algoliaIndex.deleteObject(id);
};

exports.add = async function (dataSnapshot, context) {
  if (!dataSnapshot.after.exists) {
    return null;
  }

  if (hasChangedToPrivate(dataSnapshot)) {
    const { id } = context.params;
    return algoliaIndex.deleteObject(id);
  }

  const heliblock = dataSnapshot.after.data();
  // Exit when the heliblock is private
  if (heliblock.restricted) {
    return null;
  }

  const snapshotAuthor = await firestore()
    .collection("users")
    .doc(heliblock.author)
    .get();

  let publicAuthor;
  if (snapshotAuthor.exists) {
    publicAuthor = {
      displayName: snapshotAuthor.data().displayName,
      photoURL: snapshotAuthor.data().photoURL,
    };
  } else {
    publicAuthor = unknownUser;
  }

  return algoliaIndex.saveObject({
    objectID: context.params.id,
    description: heliblock.description,
    screenshot: heliblock.screenshot,
    source: heliblock.source,
    tags: heliblock.tags,
    title: heliblock.title,
    createdAt: new firestore.Timestamp(
      heliblock.createdAt._seconds,
      heliblock.createdAt._nanoseconds
    ).toDate(),
    lastUpdate: new firestore.Timestamp(
      heliblock.lastUpdate._seconds,
      heliblock.lastUpdate._nanoseconds
    ).toDate(),
    author: {
      id: heliblock.author,
      ...publicAuthor,
    },
  });
};
