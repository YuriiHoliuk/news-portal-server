const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    text: String,
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' }
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);