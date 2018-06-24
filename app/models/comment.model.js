const mongoose = require('mongoose');

const CommentShema = mongoose.Schema({
    text: String,
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' }
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentShema);