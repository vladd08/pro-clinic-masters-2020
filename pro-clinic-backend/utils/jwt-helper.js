const jwt = require("jsonwebtoken");
const fs = require("fs");

const privateKey = fs.readFileSync("D:\\private.key", "utf8");
const publicKey = fs.readFileSync("D:\\public.key", "utf8");

const signOptions = {
  expiresIn: "1h",
  algorithm: "RS256"
};

const JwtHelper = {};

module.exports = JwtHelper;
