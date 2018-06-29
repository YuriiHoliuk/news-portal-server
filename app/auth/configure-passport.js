const passport = require('passport');
const LocalStrategy = require('passport-local');
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user.model');
const jwtConfig = require('../../config/jwt.config');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtConfig.secret,
};

function configurePassport() {
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        (email, password, done) => User.findOne({ email })
            .then(user => {

                if (!user || !user.checkPassword(password)) {
                    return done(null, false, { message: 'Invalid token' });
                }

                return done(null, user);
            })
            .catch(error => done(error))
    ));

    passport.use(new JWTStrategy(jwtOptions, function (payload, done) {
        return User.findById(payload.id)
            .then(user => user ? done(null, user) : done(null, false))
            .catch(error => done(error))
    }));

    return passport;
}

module.exports = configurePassport();