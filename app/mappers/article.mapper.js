const commentMapper = require('./comment.mapper');

module.exports = function articleMapper(article) {
    const { _id, title, text, createdAt, comments } = article;

    return {
        id: _id,
        title,
        text,
        date: createdAt,
        comments: comments.map(commentMapper),
    }
};
