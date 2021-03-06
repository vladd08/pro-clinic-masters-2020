const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('./keys/private.key', 'utf8');
const publicKey = fs.readFileSync('./keys/public.key', 'utf8');

const signOptions = {
    expiresIn: '1h',
    algorithm: 'RS256'
};

const JwtHelper = {
    generate: (payload) => {
        const token = jwt.sign(payload, privateKey, signOptions);
        return token;
    },
    verify: (token) => {
        try {
            return jwt.verify(token, publicKey);
        } catch (err) {
            return false;
        }
    },
    // TODO: Validate the token first
    getUserIdFromToken: (token) =>
        JSON.parse(Buffer.from(token.split('.')[1], 'base64')).id
};

module.exports = JwtHelper;
