const passport = require('passport');

const local = () => passport.authenticate('local', { session: false });
const jwt = () => passport.authenticate('jwt', { session: false });

module.exports = {
    local,
    jwt,
};
