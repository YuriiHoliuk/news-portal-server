const { jwt } = require('../middlewares/auth.middleware');
const { findByArticleId, create, remove } = require('../controllers/comment.controller.js');
    
module.exports = (router) => {
    router.get('/comments', findByArticleId);
    router.post('/comments', jwt(), create);
    router.delete('/comments/:id', jwt(), remove);
};
