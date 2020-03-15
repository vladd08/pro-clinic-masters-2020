const express = require("express");
const router = express.Router();

const authDecoder = require("../utils/authentication-decoder");
const credentialsValidator = require("../utils/credentials-validator");
const jwtHelper = require("../utils/jwt-helper");
const httpResponseHelper = require("../utils/http/http-response-helper");
const firebaseHelper = require("../utils/firebase-helper");

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
  const userCodesCollection = db.collection("user-codes");
  userCodesCollection
    .where("userCode", "==", codeHeader)
    .get()
    .then(snapshot => {
      const userCodes = [];
      snapshot.forEach(doc => {
        userCodes.push(doc.data());
      });

      if (!userCodes.length) {
        httpResponseHelper.badRequest(res, {
          message: "User code not found"
        });
        return;
      }

      httpResponseHelper.success(res, { codes: userCodes });
    })
    .catch(err => {
      httpResponseHelper.badRequest(res, err);
    });
});

module.exports = router;
