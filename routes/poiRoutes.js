// Import express
const express = require('express');
// Import multer configured middleware
const fileUpload = require('../middleware/img-upload');
// Import poiController module
const poiController = require(`${__dirname}/../controllers/poiController`);

const routes = express.Router();

// POI Routes
routes.route('/')
.get(poiController.getAllPois)
.post(fileUpload, poiController.createPoi)

routes.route('/getPoi')
.get(poiController.getPoi)

routes.route('/:id')
.patch(fileUpload, poiController.updatePoiById)
.delete(poiController.deletePoiById)


routes.route('/image/:id')
.patch(fileUpload, poiController.updatePoiById)

module.exports = routes;