const mongoose = require('mongoose');

const ArticleShema = mongoose.Schema({
    title: String,
    text: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

module.exports = mongoose.model('Article', ArticleShema);
