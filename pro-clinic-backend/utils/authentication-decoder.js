const authHeaderValidator = require("../validators/authentication-header-validator");

const AuthenticationDecoder = {
  decodeCredentials: (authenticationHeader) => {
    if (!authHeaderValidator.validate(authenticationHeader)) return {};
    
    const decodedAuthHeader = Buffer.from(
      authenticationHeader.split(" ")[1],
      "base64"
    ).toString();

    const splitAuthHeader = decodedAuthHeader.split(" ");
    const username = splitAuthHeader[0];
    const passowrd = splitAuthHeader[1].trim();

    return {
      username: username,
      password: passowrd,
    };
  },
};

module.exports = AuthenticationDecoder;
