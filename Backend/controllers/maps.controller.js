const { model } = require('mongoose');
const mapService = require('../services/maps.services');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { address } = req.query;
    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'coordinates not found' });
    }
}

module.exports.getDistanceAndTime = async (req, res) => {
    try {
       const error = validationResult(req);
         if (!error.isEmpty()) {
              return res.status(400).json({ errors: error.array() });
         }
         const { origin, destination } = req.query;
         const distanceAndTime = await mapService.getDistanceAndTime(origin, destination);
         res.status(200).json(distanceAndTime);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getAutoCompleteSuggestions = async (req, res) => {
    try{ 
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { input } = req.query;
        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}