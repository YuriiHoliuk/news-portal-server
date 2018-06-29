const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    title: String,
    text: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

module.exports = mongoose.model('Article', ArticleSchema);
