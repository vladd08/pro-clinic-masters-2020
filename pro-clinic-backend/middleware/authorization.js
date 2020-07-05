const jwtHelper = require('../utils/jwt-helper');
const httpResponseHelper = require('../utils/http/http-response-helper');
const authDecoder = require('../utils/authorization-decoder');

const Authorization = (req, res, next) => {
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader) {
        httpResponseHelper.badRequest(res, {
            message: 'Missing authorization header.'
        });
        return;
    }

    const token = authDecoder.decodeToken(authorizationHeader);

    if (!token) {
        httpResponseHelper.badRequest(res, {
            message: 'Invalid header format.',
            token: null
        });
        return;
    }

    const decoded = jwtHelper.verify(token);

    if (!decoded) {
        httpResponseHelper.notAuthorized(res, {
            message: 'Your authentication token has expired or is invalid.',
            token: null
        });
        return;
    }

    res.tokenPayload = decoded;

    next();
};

module.exports = Authorization;
