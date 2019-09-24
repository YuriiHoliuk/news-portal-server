const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const cors = require('./app/middlewares/cors.middleware');

async function start(port) {
    const app = express();

    app.use(cors);

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.get('/api/v1/restaurants', async(req, res) => {
        try {
            const { location = 'london' } = req.query;
            const dataPath = path.join(__dirname, 'data', 'location', `${location}.json`);
            const file = await readFile(dataPath);

            res.json(JSON.parse(file.toString()));
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    });

    app.get('/api/v1/restaurants/:id', async(req, res) => {
        try {
            const { id } = req.params;
            const dataPath = path.join(__dirname, 'data', 'restaurants', `${id}.json`);
            const file = await readFile(dataPath);
            const restaurantData = JSON.parse(file.toString());
            const {
                data: {
                    sections: { 0: { subsectionUuids: sections, uuid: firstSectionUuid } },
                    subsectionsMap: sectionsMap,
                    sectionEntitiesMap,
                    ...restData
                },
                ...rest
            } = restaurantData;
            const entitiesMap = sectionEntitiesMap[firstSectionUuid];
            const responseData = {
                data: {
                    ...restData,
                    sections,
                    sectionsMap,
                    entitiesMap,
                },
                ...rest,
            };

            res.json(responseData);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
            res.sendStatus(500);
        }
    });

    app.get('*', (req, res) => res.send({message: 'Not Found.'}));

    app.listen(port, () => console.log(`App listen on port ${port}.`));
};

module.exports = start;
