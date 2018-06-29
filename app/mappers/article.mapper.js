const commentMapper = require('./comment.mapper');

module.exports = function articleMapper(article) {
    const { _id, title, text, createdAt, comments } = article;

    return {
        _id,
        title,
        text,
        date: createdAt,
        comments: comments.map(commentMapper),
    }
};
