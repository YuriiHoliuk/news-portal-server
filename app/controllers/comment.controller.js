const { Types: { ObjectId } } = require('mongoose');

const Article = require('../models/article.model');
const Comment = require('../models/comment.model');

const create = async (req, res) => {
    const comment = req.body;
    const articleId = comment.article;

    let article;

    try {
        article = await Article.findById(articleId);

        if (!article) {
            return res.status(404).send({ message: `Cannot find article with id: ${articleId}` });
        }
    } catch (error) {
        if (error.kind === 'ObjectId' || error.name === 'NotFound') {
            return res.status(404).send({ message: `Cannot find article with id: ${articleId}` });
        }

        return res.status(500).send({ message: error.message || `Cannot remove article with id: ${articleId}` });
    }

    try {
         const savedComment = await new Comment(comment).save();
         article.comments.push(savedComment._id);
         await article.save();
 
         res.send(savedComment);
    } catch (error) {
        res.status(500).send({ message: error.message || 'Cannot save Comment.' });
    }
};

const findByArticleId = async (req, res) => {
    const { articleId } = req.query;

    try {
        const query = articleId ? { article: articleId } : {};

        res.send(await Comment.find(query));
    } catch (error) {
        res.status(500).send({ message: error.message || 'Cannot retrive Comment.' })
    }
}

const remove = async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findByIdAndRemove(id);

        if (!comment) {
            return res.status(404).send({ message: `Cannot find comment with id: ${id}` });
        }

        res.send(comment);
    } catch (error) {
        if (error.kind === 'ObjectId' || error.name === 'NotFound') {
            return res.status(404).send({ message: `Cannot find comment with id: ${id}` });
        }

        return res.status(500).send({ message: error.message || `Cannot remove comment with id: ${id}` });
    }
}


module.exports = {
    create,
    findByArticleId,
    remove,
};
