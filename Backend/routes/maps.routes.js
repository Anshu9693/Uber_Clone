const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware.js');
const { query } = require('express-validator');
const  mapController = require('../controllers/maps.controller.js');

router.get('/maps-coordinates',
    query('address').isString().isLength({ min: 3 }).withMessage('Address is required'),
    authMiddleware.authUser,
    mapController.getCoordinates
);

router.get("/get-distance-time", 
   query('origin').isString().isLength({min:3}).withMessage('Origin is required'),
   query('destination').isString().isLength({min:3}).withMessage('Destination is required'),
   authMiddleware.authUser,
   mapController.getDistanceAndTime
);

router.get("/get-suggestion",
    query('input').isString().isLength({ min: 3 }).withMessage('Address is required'),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions
)

module.exports = router;