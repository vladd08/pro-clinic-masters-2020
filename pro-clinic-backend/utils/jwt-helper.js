const jwt = require("jsonwebtoken");
const fs = require("fs");

const privateKey = fs.readFileSync("./keys/private.key", "utf8");
const publicKey = fs.readFileSync("./keys/public.key", "utf8");

const signOptions = {
  expiresIn: "1h",
  algorithm: "RS256"
};

const JwtHelper = {};

module.exports = JwtHelper;
