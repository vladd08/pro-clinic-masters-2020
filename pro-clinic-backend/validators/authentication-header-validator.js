const AuthenticationHeaderValidator = {
  validate: (header) => {
    const headerContent = header.split(" ");

    if (headerContent[0] !== "Basic" || !headerContent[1]) return false;

    const encodedHeader = headerContent[1];
    const decodedAuthHeader = Buffer.from(encodedHeader, "base64").toString();

    return /.* \n.* \n/.test(decodedAuthHeader);
  },
};

module.exports = AuthenticationHeaderValidator;
