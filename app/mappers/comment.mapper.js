module.exports = function commentMapper(comment) {
    const { _id, text, article } = comment;

    return {
        id: _id,
        text,
        article,
    };
};
