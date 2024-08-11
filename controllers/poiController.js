const Poi = require('./../models/poiModel');

// Import multer
const multer = require('multer');

var OBJECT_ID_RE = /^[a-f\d]{24}$/i;

// Multer setup for file uploads
const upload = multer({ dest: 'public/img/pois' });

// Create a new Point of Interest (POI)
exports.createPoi = async (req, res) => {
    try {

        var myBody = req.body;
        const data = { ...myBody };

        // If there's a file (photo) attached, update the 'photo' field
        if (req.file) {
            const photo = req.file.filename;
            data.photo = photo;
        }

        // Parse geoCoordinates from string to object if applicable
        if (data.geoCoordinates && typeof data.geoCoordinates === 'string') {
            data.geoCoordinates = JSON.parse(data.geoCoordinates);
        }

        // Create a new POI in the database
        const newPoi = await Poi.create(data);

        // Respond with success status and the created POI
        res.status(201).json({
            status: 'success',
            data: {
                tour: newPoi
            }
        });
    } catch (err) {
        // Respond with failure status and the error message
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

// Get all Points of Interest (POIs)
exports.getAllPois = async (req, res) => {
    try {
        // Retrieve all POIs from the database
        const pois = await Poi.find();

        // Respond with success status and the list of POIs
        res.status(200).json({
            status: 'success',
            results: pois.length,
            data: {
                pois
            }
        });
    } catch (err) {
        // Respond with failure status and the error message
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

// Get a specific Point of Interest (POI) by a given parameter
exports.getPoi = async (req, res) => {
    try {
        // Extract the parameter name and value from the request query
        const paramName = Object.keys(req.query)[0];
        const paramValue = req.query[paramName];

        // Check if required parameters are present
        if (!paramName || !paramValue) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid request. Missing paramName or paramValue.'
            });
        }

        // Construct a query object based on the provided parameter
        const query = { [paramName]: paramValue };
        // Find the POI in the database
        const poi = await Poi.findOne(query);

        // If the POI is not found, respond with a 404 status and message
        if (!poi) {
            return res.status(404).json({
                status: 'fail',
                message: 'POI not found'
            });
        }

        // Respond with success status and the retrieved POI
        res.status(200).json({
            status: 'success',
            data: {
                poi
            }
        });
    } catch (err) {
        // Respond with failure status and the error message
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

// Update a specific Point of Interest (POI) by ID
exports.updatePoiById = async (req, res) => {
    try {
        // Extract the request body and create an updates object
        var myBody = req.body;
        const updates = { ...myBody };
        // If there's a file (photo) attached, update the 'photo' field
        if (req.file) {
            const photo = req.file.filename;
            updates.photo = photo;
        }

        // Parse geoCoordinates from string to object if applicable
        if (updates.geoCoordinates && typeof updates.geoCoordinates === 'string') {
            updates.geoCoordinates = JSON.parse(updates.geoCoordinates);
        }
        // Find and update the specified POI in the database
        const poi = await Poi.findOneAndUpdate({ _id: req.params.id }, updates, {
            new: true,
        });
        // If the POI is not found, respond with a 404 status and message
        if (!poi) {
            return res.status(404).json({
                status: 'fail',
                message: 'POI not found'
            });
        }
        // Respond with success status and the updated POI
        res.status(200).json({
            status: 'success',
            data: {
                poi
            }
        });
    } catch (err) {
        // Respond with failure status and the error message
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

// Delete a specific Point of Interest (POI) by ID
exports.deletePoiById = async (req, res) => {
    try {
        // Find and delete the specified POI in the database
        const poi = await Poi.findOneAndDelete({ _id: req.params.id });
        // If the POI is not found, respond with a 404 status and message
        if (!poi) {
            return res.status(404).json({
                status: 'fail',
                message: 'POI not found'
            });
        }
        // Respond with success status and null data (since the POI is deleted)
        res.status(200).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        // Respond with failure status and the error message
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};
