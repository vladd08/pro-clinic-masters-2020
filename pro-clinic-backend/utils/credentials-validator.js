const FirebaseHelper = require("./firebase-helper");

const CredentialsValidator = {
  validate: credentials => {
    const firebase = FirebaseHelper.getInstance();

    const promise = new Promise(resolve => {
      firebase
        .auth()
        .signInWithEmailAndPassword(credentials.username, credentials.password)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          resolve({ error: err });
        });
    });

    return promise;
  }
};

module.exports = CredentialsValidator;
