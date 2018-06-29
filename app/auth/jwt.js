const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt.config');

function createJWTToken(data) {
    return jwt.sign({ data }, jwtConfig.secret, { expiresIn: jwtConfig.ttl, algorithm: 'HS256' });
}

module.exports = createJWTToken;
