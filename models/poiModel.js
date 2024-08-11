const mongoose = require('mongoose');

// Schema
const poiSchema = new mongoose.Schema({
    name: String,
    category: String,
    address: String,
    geoCoordinates: {
        type: {
          type: String,
          enum: ['Point'],
        },
        coordinates: {
          type: [Number],
        }
      },
    photo: {
        type: String,
        default: 'default.png'
    }
});

// Model out of schema
const Poi = mongoose.model("Poi", poiSchema, "POIs");

module.exports = Poi;