const express = require('express');
const router = express.Router();
const {body,query} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create',
    authMiddleware.authUser,
    body("pickup").isString().isLength({min:3}).withMessage("Pickup location is required"),
    body("destination").isString().isLength({min:3}).withMessage("Destination is required"),
    body("vehicleType").isString().isIn(["car", "bike", "auto"]).withMessage("Vehicle type is required and must be one of 'car', 'bike', or 'auto'"),
    rideController.createRide
)

router.get('/get-fare',
    authMiddleware.authUser,
    query("pickup").isString().isLength({min:3}).withMessage("Pickup location is required"),
    query("destination").isString().isLength({min:3}).withMessage("Destination is required"),
    rideController.getFare
)

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide
)
router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    rideController.startRide
)

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)


module.exports = router;