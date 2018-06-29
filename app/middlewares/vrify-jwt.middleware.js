const verifyJWTToken = require('../auth/verify-jwt-token');

function verifyJWT(req, res, next) {
    const token = req.get('Authorization');

    verifyJWTToken(token)
        .then(decodedToken => {
            req.user = decodedToken.data;
            next();
        })
        .catch(error => req.setStatus(401).send({ message: error.message || 'Unauthorized' }))
}