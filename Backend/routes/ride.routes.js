const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create',
    authMiddleware.authUser,
    body("pickup").isString().isLength({min:3}).withMessage("Pickup location is required"),
    body("destination").isString().isLength({min:3}).withMessage("Destination is required"),
    body("vehicleType").isString().isIn(["car", "bike", "auto"]).withMessage("Vehicle type is required and must be one of 'car', 'bike', or 'auto'"),
    rideController.createRide
)


module.exports = router;