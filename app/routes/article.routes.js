const articles = require('../controllers/article.controller.js');
    
module.exports = (app) => {
    app.post('/articles', articles.create);
    app.get('/articles', articles.findAll);
    app.delete('/articles/:id', articles.remove);
}