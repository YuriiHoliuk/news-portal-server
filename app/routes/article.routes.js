const passport = require('passport');

const articles = require('../controllers/article.controller.js');
    
module.exports = (router) => {
    router.get('/articles', articles.findAll);
    router.all('/articles/*', passport.authenticate('jwt'));
    router.post('/articles', articles.create);
    router.delete('/articles/:id', articles.remove);
};
