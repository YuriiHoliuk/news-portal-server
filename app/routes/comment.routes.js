const comments = require('../controllers/comment.controller.js');
    
module.exports = (app) => {
    app.post('/comments', comments.create);
    app.get('/comments', comments.findByArticleId);
    app.delete('/comments/:id', comments.remove);
}