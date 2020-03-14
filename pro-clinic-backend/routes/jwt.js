const express = require("express");
const router = express.Router();

const authDecoder = require("../utils/authentication-decoder");
const credentialsValidator = require("../utils/credentials-validator");
const jwtHelper = require("../utils/jwt-helper");

router.get("/", function(req, res, next) {
  const authHeader = req.header("Authorization");
  const credentials = authDecoder.decodeCredentials(authHeader);
  credentialsValidator.validate(credentials);
  console.log(credentials);
  const payload = {};

  res.json({
    test: "g243g34v3434"
  });
});

module.exports = router;
