const totp = require("otplib").totp;
totp.options = {
  step: 10, // 10 sec availability time for a password,
  window: 0,
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
