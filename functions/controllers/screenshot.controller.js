const screenshot = require("../services/screenshot");
const previewGenerator = require("../services/preview-generator");
const sanitize = require("../services/sanitize");
const { storage, firestore } = require("firebase-admin");

exports.generate = async function (dataSnapshot, context) {
  // Exit when the data is deleted.
  if (!dataSnapshot.after.exists) {
    return null;
  }

  const { html, css, alignment, additionalLinks } = dataSnapshot.after.data();

  const preview = previewGenerator({
    html: sanitize(html),
    css,
    alignment,
    additionalLinks,
  });

  const { id } = context.params;

  const imageBuffer = await screenshot(preview);
  const file = storage().bucket().file(`screenshots/${id}.png`);
  await file.save(imageBuffer);

  const url = await file.getSignedUrl({
    action: "read",
    expires: "03-09-2491",
  });

  return firestore()
    .collection("heliblocks")
    .doc(id)
    .update({ screenshot: url[0] });
};
