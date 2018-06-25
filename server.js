const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config');
const articleRoutes = require('./app/routes/article.routes');
const commentRoutes = require('./app/routes/comment.routes');

async function start(port) {
    mongoose.Promise = global.Promise;

    try {
        await mongoose.connect(dbConfig.url);
        console.log('Connected to db!');
    } catch (e) {
        console.error('Cannot connect to db');
    }

    const app = express();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    articleRoutes(app);
    commentRoutes(app);

    app.get('*', (req, res) => res.send({message: 'Not Found.'}));

    app.listen(port, () => console.log(`App listen on port ${port}.`));
};

module.exports = start;