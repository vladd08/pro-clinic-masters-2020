const AuthorizationHeaderValidator = {
  validate: (header) => {
    const headerContent = header.split(" ");

    if (headerContent[0] !== "Bearer" || !headerContent[1]) return false;

    return true;
  },
};

module.exports = AuthorizationHeaderValidator;
