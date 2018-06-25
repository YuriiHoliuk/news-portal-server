const comments = require('../controllers/comment.controller.js');
    
module.exports = (router) => {
    router.post('/comments', comments.create);
    router.get('/comments', comments.findByArticleId);
    router.delete('/comments/:id', comments.remove);
};
