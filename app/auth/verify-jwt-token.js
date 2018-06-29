const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const verify = promisify(jwt.verify);

function verifyJWTToken(token) {
    return verify(token)
        .then(decodedToken => {
            if (!decodedToken) {
                throw new Error('Cannot decode token');
            }

            return decodedToken;
        });
}

module.exports = verifyJWTToken;
