const express = require("express");
const router = express.Router();

const authenticationMiddleware = require("../middleware/authorization");
const httpResponseHelper = require("../utils/http/http-response-helper");
const totp = require("../utils/totp");
const usersDb = require("../db/users-db");

router.get("/2fa", async (req, res, next) => {
  const codeHeader = req.header("2fa");
  if (!codeHeader) {
    httpResponseHelper.badRequest(res, {
      message: "Missing code header",
    });
    return;
  }

  const user = await usersDb.getUserByCode(codeHeader).catch((err) => {
    httpResponseHelper.notFound(res, {
      message: err,
    });
  });

  if (!user) return;

  const password = totp.generate(user.code);
  httpResponseHelper.success(res, { password });
});

router.use(authenticationMiddleware).get("/", async (req, res) => {
  const otpHeader = req.header("otp");
  if (!otpHeader) {
    httpResponseHelper.badRequest(res, {
      message: "Missing OTP header",
    });
    
    return;
  }

  const tokenPayload = res.tokenPayload;

  const user = await usersDb.getUserById(tokenPayload.id).catch((err) => {
    httpResponseHelper.notFound(res, {
      message: err,
    });
  });

  if (!user) return;

  const isValid = Boolean(totp.verify(otpHeader, user.code));

  console.log(user);
  console.log(totp.verify(otpHeader, user.code));

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

module.exports = router;
