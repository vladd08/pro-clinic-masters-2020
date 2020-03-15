const express = require("express");
const router = express.Router();

const authDecoder = require("../utils/authentication-decoder");
const credentialsValidator = require("../utils/credentials-validator");
const jwtHelper = require("../utils/jwt-helper");
const httpResponseHelper = require("../utils/http/http-response-helper");
const firebaseHelper = require("../utils/firebase-helper");
const totp = require("../utils/totp");

router.get("/", async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    httpResponseHelper.badRequest(res, {
      message: "Missing authentication header",
      token: null
    });
    return;
  }

  const credentials = authDecoder.decodeCredentials(authHeader);

  if (!credentials.username) {
    httpResponseHelper.badRequest(res, {
      message: "Invalid authentication header",
      token: null
    });
    return;
  }

  const result = await credentialsValidator.validate(credentials);

  if (result.error) {
    httpResponseHelper.badRequest(res, {
      message: "Invalid authentication attempt",
      token: null
    });
    return;
  }

  const payload = {};

  httpResponseHelper.success(res, {
    message: "Authentication success",
    token: "token"
  });
});

router.get("/2fa", async (req, res, next) => {
  const codeHeader = req.header("2fa");
  if (!codeHeader) {
    httpResponseHelper.badRequest(res, {
      message: "Missing code header"
    });
    return;
  }

  const db = firebaseHelper.getDb();
  const usersCollection = db.collection("users");

  usersCollection
    .where("code", "==", codeHeader)
    .limit(1)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        httpResponseHelper.badRequest(res, {
          message: "User code not found"
        });
        return;
      }

      let code;
      snapshot.forEach(doc => {
        code = doc.data().code;
      });

      const password = totp.generate(code);

      httpResponseHelper.success(res, { password });
    })
    .catch(err => {
      httpResponseHelper.badRequest(res, err);
    });
});

module.exports = router;
