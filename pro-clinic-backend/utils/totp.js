const totp = require("otplib").totp;
totp.options = {
  step: 11, // 11 sec availability time for a password,
};

const Totp = {
  generate: (code) => {
    const password = totp.generate(code);
    return password;
  },
  verify: (token, secret) => {
    return totp.check(token, secret);
  },
};

module.exports = Totp;
