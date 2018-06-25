module.exports = function commentMapper(comment) {
    const { _id, text } = comment;

    return {
        id: _id,
        text,
    };
};
