const firebase = require("firebase/app");
require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyBM0nIYNskg_sj2RHEbjRleuRVLVdgVuDE",
  authDomain: "pro-clinic-d943c.firebaseapp.com",
  databaseURL: "https://pro-clinic-d943c.firebaseio.com",
  projectId: "pro-clinic-d943c",
  storageBucket: "pro-clinic-d943c.appspot.com",
  messagingSenderId: "15192787568",
  appId: "1:15192787568:web:fd92250cf6d51af7d602b5",
  measurementId: "G-MBDQW26EHR"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const FirebaseHelper = {
  getInstance: () => firebaseApp
};

module.exports = FirebaseHelper;
