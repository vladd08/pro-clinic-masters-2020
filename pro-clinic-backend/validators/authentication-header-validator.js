const AuthenticationHeaderValidator = {
  validate: header => {
    const decodedAuthHeader = Buffer.from(header, "base64").toString();

    return /.* \n.* \n/.test(decodedAuthHeader);
  }
};

module.exports = AuthenticationHeaderValidator;
