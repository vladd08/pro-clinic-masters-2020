const express = require('express');
const router = express.Router();

const authDecoder = require('../utils/authentication-decoder');
const credentialsValidator = require('../utils/credentials-validator');
const jwtHelper = require('../utils/jwt-helper');
const httpResponseHelper = require('../utils/http/http-response-helper');

// The format of the authentication header is 'Basic' + email \n password \n base64 encoded
router.get('/', async (req, res) => {
    const authHeader = req.header('Authentication');
    if (!authHeader) {
        httpResponseHelper.badRequest(res, {
            message: 'Missing authentication header',
            token: null
        });
        return;
    }

    const credentials = authDecoder.decodeCredentials(authHeader);

    if (!credentials.username) {
        httpResponseHelper.badRequest(res, {
            message: 'Invalid authentication header',
            token: null
        });
        return;
    }

    const result = await credentialsValidator.validate(credentials);

    if (result.error) {
        httpResponseHelper.badRequest(res, {
            message: 'Invalid authentication attempt',
            token: null
        });
        return;
    }

    const payload = {
        username: credentials.username,
        id: result.user.uid
    };
    const token = jwtHelper.generate(payload);

    httpResponseHelper.success(res, {
        message: 'Authentication successful',
        token
    });
});

module.exports = router;
