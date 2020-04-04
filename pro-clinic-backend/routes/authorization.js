const express = require("express");
const router = express.Router();

const authenticationMiddleware = require("../middleware/authorization");
const jwtHelper = require("../utils/jwt-helper");
const httpResponseHelper = require("../utils/http/http-response-helper");
const firebaseHelper = require("../utils/firebase-helper");
const totp = require("../utils/totp");

router.get("/2fa", async (req, res, next) => {
  const codeHeader = req.header("2fa");
  if (!codeHeader) {
    httpResponseHelper.badRequest(res, {
      message: "Missing code header",
    });
    return;
  }

  const db = firebaseHelper.getDb();
  const usersCollection = db.collection("users");

  usersCollection
    .where("code", "==", codeHeader)
    .limit(1)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        httpResponseHelper.badRequest(res, {
          message: "User code not found",
        });
        return;
      }

      let code;
      snapshot.forEach((doc) => {
        code = doc.data().code;
      });

      const password = totp.generate(code);

      httpResponseHelper.success(res, { password });
    })
    .catch((err) => {
      httpResponseHelper.badRequest(res, err);
    });
});

router.use(authenticationMiddleware).get("/", (req, res) => {
  const otpHeader = req.header("otp");
  if (!otpHeader) {
    httpResponseHelper.badRequest(res, {
      message: "Missing OTP header",
    });
    return;
  }

  const tokenPayload = res.tokenPayload;

  const db = firebaseHelper.getDb();
  const usersCollection = db.collection("users");

  usersCollection
    .where("uuid", "==", tokenPayload.id)
    .limit(1)
    .get()
    .then((snapshot) => {
      let code;

      snapshot.forEach((doc) => {
        code = doc.data().code;
      });

      const isValid = Boolean(totp.verify(otpHeader, code));

      if (!isValid) {
        httpResponseHelper.badRequest(res, {
          message: "Invalid OTP code, please try again",
        });
        return;
      }

      httpResponseHelper.success(res, {
        message: "Authorization successful",
      });
    });
});

module.exports = router;
