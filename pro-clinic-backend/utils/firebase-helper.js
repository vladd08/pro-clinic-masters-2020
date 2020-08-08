const admin = require("firebase-admin");
const firebase = require("firebase/app");
require("firebase/auth");

const serviceAccount = require("../keys/pro-clinic-d943c-95939e66f88b.json");
const firebaseConfig = require("../keys/firebase-config.json");

const adminFirebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = admin.firestore();

const FirebaseHelper = {
  getInstance: () => firebaseApp,
  getAdminInstance: () => adminFirebaseApp,
  getDb: () => db
};

module.exports = FirebaseHelper;
