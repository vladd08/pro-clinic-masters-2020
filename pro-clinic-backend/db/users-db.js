const firebaseHelper = require("../utils/firebase-helper");

const UsersDb = {
  getUserById: (id) => {
    const db = firebaseHelper.getDb();
    const usersCollection = db.collection("users");

    const promise = new Promise((resolve, reject) => {
      usersCollection
        .where("uuid", "==", id)
        .limit(1)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            reject("User not found");
            return;
          }

          let user;
          snapshot.forEach((doc) => {
            user = doc.data();
          });

          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });

    return promise;
  },
  getUserByCode: (code) => {
    const db = firebaseHelper.getDb();
    const usersCollection = db.collection("users");

    const promise = new Promise((resolve, reject) => {
      usersCollection
        .where("code", "==", code)
        .limit(1)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            reject("User not found");
            return;
          }

          let user;
          snapshot.forEach((doc) => {
            user = doc.data();
          });

          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });

    return promise;
  }
};

module.exports = UsersDb;
