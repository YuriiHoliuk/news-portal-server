const { local, jwt } = require('../middlewares/auth.middleware');
const { signIn, create, get } = require('../controllers/user.controller.js');

module.exports = (router) => {
    router.post('/auth/sign-in', local(), signIn);
    router.post('/auth/sign-up', create);
    router.get('/user/details', jwt(), get);
};