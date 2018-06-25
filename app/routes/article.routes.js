const articles = require('../controllers/article.controller.js');
    
module.exports = (router) => {
    router.post('/articles', articles.create);
    router.get('/articles', articles.findAll);
    router.delete('/articles/:id', articles.remove);
};
