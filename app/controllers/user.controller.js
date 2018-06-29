const User = require('../models/user.model');
const createJWTToken = require('../auth/jwt');
const jwtConfig = require('../../config/jwt.config');

const create = async (req, res) => {
    const { email, password, confirm_password, name } = req.body;

    // TODO: move validation from controller
    if (password !== confirm_password) {
        return res.setStatus(400).send({ message: 'Bad request: password & confirm_password should be equal' });
    }

    const user = await User.create({
        email,
        password,
        name,
    });

    const token = createJWTToken({ id: user._id });

    const data = {
        account: { name: user.name, email: user.email },
        token,
        ttl: jwtConfig.ttl,
    };

    res.send(data);
};

const signIn = (req, res) => {
   const { name, email, _id } = req.user;

    const token = createJWTToken({ id: _id });

    const data = {
        account: { name, email },
        token,
        ttl: jwtConfig.ttl,
    };

    res.send(data);
};

const get = (req, res) => {
    const { name, email } = req.user;

    res.send({ name, email });
};

module.exports = {
    create,
    get,
    signIn,
};
