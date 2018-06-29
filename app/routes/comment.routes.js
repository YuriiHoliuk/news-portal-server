const passport = require('passport');

const comments = require('../controllers/comment.controller.js');
    
module.exports = (router) => {
    router.get('/comments', comments.findByArticleId);
    router.all('/comments/*', passport.authenticate('jwt'));
    router.post('/comments', comments.create);
    router.delete('/comments/:id', comments.remove);
};
