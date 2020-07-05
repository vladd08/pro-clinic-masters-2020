const express = require('express');
const router = express.Router();

const authenticationMiddleware = require('../middleware/authorization');
const httpResponseHelper = require('../utils/http/http-response-helper');
const totp = require('../utils/totp');
const usersDb = require('../db/users-db');
const firebaseTokenGenerator = require('../utils/firebase-token-generator');

router.get('/2fa', async (req, res, next) => {
    const codeHeader = req.header('2fa');
    if (!codeHeader) {
        httpResponseHelper.badRequest(res, {
            message: 'Missing code header'
        });
        return;
    }

    const user = await usersDb.getUserByCode(codeHeader).catch((err) => {
        httpResponseHelper.notFound(res, {
            message: err
        });
    });

    if (!user) return;

    const password = totp.generate(user.code);
    httpResponseHelper.success(res, {
        message: 'OTP generated',
        password
    });
});

router.use(authenticationMiddleware).get('/', async (req, res) => {
    const otpHeader = req.header('otp');
    if (!otpHeader) {
        httpResponseHelper.badRequest(res, {
            message: 'Missing OTP header.'
        });

        return;
    }

    const tokenPayload = res.tokenPayload;

    const user = await usersDb.getUserById(tokenPayload.id).catch((err) => {
        httpResponseHelper.notFound(res, {
            message: err
        });
    });

    if (!user) return;

    const isValid = Boolean(totp.verify(otpHeader, user.code));

    if (!isValid) {
        httpResponseHelper.badRequest(res, {
            message: 'Invalid OTP code, please try again.'
        });
        return;
    }

    const token = await firebaseTokenGenerator.generate(user.uuid).catch(() => {
        httpResponseHelper.badRequest(res, {
            message:
                'OTP validation was successful, but something was wrong when attempting to connect to Firebase.'
        });
    });

    if (!user) return;

    httpResponseHelper.success(res, {
        message: 'Authorization successful.',
        token
    });
});

module.exports = router;
