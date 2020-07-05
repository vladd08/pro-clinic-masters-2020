const firebaseHelper = require("./firebase-helper");

const FirebaseTokenGenerator = {
  generate: (userId) => {
    const adminInstance = firebaseHelper.getAdminInstace();

    const promise = new Promise((resolve, reject) => {
      adminInstance
        .auth()
        .createCustomToken(userId)
        .then((token) => {
          resolve(token);
        })
        .catch((err) => {
          reject(err);
        });
    });

    return promise;
  },
};

module.exports = FirebaseTokenGenerator;
