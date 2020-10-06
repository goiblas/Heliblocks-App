const { TOKEN_KEY } = require("../../config/token-key");
const jwt = require("jsonwebtoken");

exports.encode = function (uid) {
  return jwt.sign({ uid }, TOKEN_KEY);
};

exports.decode = function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, TOKEN_KEY, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        const { uid } = decoded;
        if (typeof uid === "string") {
          resolve(uid);
        } else {
          reject("Uid not found");
        }
      }
    });
  });
};
