const { Types: { ObjectId } } = require('mongoose');

const Article = require('../models/article.model');
const Comment = require('../models/comment.model');

const create = async (req, res) => {
    const { title, text, comments } = req.body;
    const articleId = ObjectId();

    try {
        let article;

        if (comments) {
            const savedComments = await Comment.insertMany(comments.map(({ text }) => ({ text, article: articleId })));
            const commentIds = savedComments.map(({ _id }) => _id);
            article = new Article({ title, text, _id: articleId, comments: commentIds });
        } else {
            article = new Article({ title, text, _id: articleId });
        }

         await article.save();
         const articleWithComments = await Article.findById(articleId).populate('comments');
 
         res.send(articleWithComments);
    } catch (error) {
        res.status(500).send({ message: error.message || 'Cannot save Article.' });
    }
};

const findAll = async (req, res) => {
    try {
        res.send(await Article.find().populate('comments'));
    } catch (error) {
        res.status(500).send({ message: error.message || 'Cannot retrive articles.' });
    }
}

const remove = async (req, res) => {
    const { id } = req.params;

    try {
        const article = await Article.findByIdAndRemove(id).populate('comments');

        if (!article) {
            return res.status(404).send({ message: `Cannot find article with id: ${id}` });
        }

        const removeQueries = article.comments.map(comment => comment.remove());
        await Promise.all(removeQueries);

        res.send(article);
    } catch (error) {
        if (error.kind === 'ObjectId' || error.name === 'NotFound') {
            return res.status(404).send({ message: `Cannot find article with id: ${id}` });
        }

        return res.status(500).send({ message: error.message || `Cannot remove article with id: ${id}` });
    }
}


module.exports = {
    create,
    findAll,
    remove,
};
