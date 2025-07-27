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

module.exports = router;