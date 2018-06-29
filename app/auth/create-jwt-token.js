const jwt = require('jsonwebtoken');
const jwtConfig = require('./config/jwt.config');

module.exports = function (data) {
    return jwt.sign({ data }, jwtConfig.secret, { expiresIn: '1h', algorithm: 'HS256' });
};
