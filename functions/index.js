const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./config/serviceAccountKey.json");
/**
 * Initialize
 */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://heliblocks.firebaseio.com",
  storageBucket: "heliblocks.appspot.com",
});

admin.firestore().settings({
  timestampsInSnapshots: true,
});

const heliblocksController = require("./controllers/heliblocks.controller");
const usersController = require("./controllers/users.controller");
const screenshotController = require("./controllers/screenshot.controller");
const algoliaController = require("./controllers/algolia.controller");
const apiController = require("./controllers/api.controller");
const tokenController = require("./controllers/token.controller");

/**
 * User functions
 */
exports.createUser = functions.auth.user().onCreate(usersController.create);

/**
 * Heliblocks functions
 */
exports.compileHeliblock = functions.firestore
  .document("heliblocks/{id}")
  .onWrite(heliblocksController.compile);

exports.deleteHeliblock = functions.firestore
  .document("heliblocks/{id}")
  .onDelete(heliblocksController.delete);

exports.generateScreenshot = functions.firestore
  .document("heliblocks/{id}")
  .onWrite(screenshotController.generate);

/**
 * Algolia functions
 */
exports.algoliaAdd = functions.firestore
  .document("heliblocks_compiled/{id}")
  .onWrite(algoliaController.add);

exports.algoliaDelete = functions.firestore
  .document("heliblocks_compiled/{id}")
  .onDelete(algoliaController.delete);

exports.algoliaUpdateAuthor = functions.firestore
  .document("users/{id}")
  .onWrite(algoliaController.updateAuthor);

/**
 * Tokens
 */
exports.generateToken = functions.https.onCall(tokenController.generate);

/**
 * Api rest
 */
exports.api = functions.https.onRequest(apiController.api);
