const authHeaderValidator = require("../validators/authorization-header-validator");

const AuthorizationDecoder = {
  decodeToken: (authorizationHeader) => {
    if (!authHeaderValidator.validate(authorizationHeader)) return '';

    const token = authorizationHeader.split(" ")[1];

    return token;
  },
};

module.exports = AuthorizationDecoder;
