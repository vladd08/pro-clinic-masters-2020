const totp = require("otplib").totp;
totp.options = {
  step: 10 // 10 sec availability time for a password
};

const Totp = {
  generate: code => {
    const password = totp.generate(code);
    return password;
  }
};

module.exports = Totp;
