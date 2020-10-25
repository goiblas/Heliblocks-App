const { firestore } = require("firebase-admin");
const tokenService = require("../services/token");
const express = require("express");
const { isUserPro } = require("../services/users");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const uid = await tokenService.decode(token);
    const snapshotToken = await firestore().collection("tokens").doc(uid).get();

    if (snapshotToken.exists) {
      const snapshotUser = await firestore().collection("users").doc(uid).get();

      if (snapshotUser.exists) {
        const isPro = await isUserPro(uid);
        console.log("isPro", isPro);
        const { displayName, photoURL } = snapshotUser.data();
        const snapshotHeliblocks = await firestore()
          .collection("heliblocks_compiled")
          .where("author", "==", uid)
          .get();

        res.json({
          displayName,
          photoURL,
          heliblocks: snapshotHeliblocks.docs.map((snapshot) => ({
            objectID: snapshot.id,
            title: snapshot.data().title,
            lastUpdate: snapshot.data().lastUpdate,
            screenshot: snapshot.data().screenshot,
            source: snapshot.data().source,
            tags: snapshot.data().tags,
            description: snapshot.data().description,
          })),
          isPro,
        });
      } else {
        res.status(401).send({ error: "Invalid token" });
      }
    } else {
      res.status(401).send({ error: "Invalid token" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Invalid autenticacion" });
  }
});

exports.router = router;
