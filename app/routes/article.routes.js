const { jwt } = require('../middlewares/auth.middleware');
const { findAll, create, remove } = require('../controllers/article.controller.js');
    
module.exports = (router) => {
    router.get('/articles', findAll);
    router.post('/articles', jwt(), create);
    router.delete('/articles/:id', jwt(), remove);
};
