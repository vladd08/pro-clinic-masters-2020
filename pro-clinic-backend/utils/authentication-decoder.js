const AuthenticationDecoder = {
  decodeCredentials: authenticationHeader => {
    const decodedAuthHeader = Buffer.from(
      authenticationHeader,
      "base64"
    ).toString();
    const splitAuthHeader = decodedAuthHeader.split(" ");
    const username = splitAuthHeader[0];
    const passowrd = splitAuthHeader[1];

    return {
      username: username,
      password: passowrd
    };
  }
};

module.exports = AuthenticationDecoder;
