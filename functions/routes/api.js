const { firestore } = require("firebase-admin");
const tokenService = require("../services/token");
const express = require("express");
const { isUserPro } = require("../services/users");
const router = express.Router();

function getUsersHeliblocksFromSnapshot(snapshotHeliblocks, isPro) {
  const privateCompiled = 0;
  const userFreePrivateLimit = 1;
  return snapshotHeliblocks.docs
    .map((snapshot) => {
      const heliblock = snapshot.data();
      if (heliblock.restricted) {
        privateCompiled++;
        if (!isPro && privateCompiled > userFreePrivateLimit) {
          return null;
        }
      }
      return {
        objectID: heliblock.id,
        title: heliblock.title,
        lastUpdate: heliblock.lastUpdate,
        screenshot: heliblock.screenshot,
        source: heliblock.source,
        tags: heliblock.tags,
        description: heliblock.description,
      };
    })
    .filter(Boolean);
}
router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const uid = await tokenService.decode(token);
    const snapshotToken = await firestore().collection("tokens").doc(uid).get();

    if (snapshotToken.exists) {
      const snapshotUser = await firestore().collection("users").doc(uid).get();

      if (snapshotUser.exists) {
        const isPro = await isUserPro(uid);
        const { displayName, photoURL } = snapshotUser.data();
        const snapshotHeliblocks = await firestore()
          .collection("heliblocks_compiled")
          .where("author", "==", uid)
          .get();

        res.json({
          displayName,
          photoURL,
          heliblocks: getUsersHeliblocksFromSnapshot(snapshotHeliblocks, isPro),
          isPro,
        });
      } else {
        res.status(401).send({ error: "Invalid token" });
      }
    } else {
      res.status(401).send({ error: "Invalid token" });
    }
  } catch (error) {
    res.status(401).send({ error: "Invalid autenticacion" });
  }
});

exports.router = router;
