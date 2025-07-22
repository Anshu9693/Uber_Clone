const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const captainController = require('../controllers/captain.controller.js');




router.post('/register', [
    body("email").isEmail().withMessage("Invalid email format"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must be at least 3 characters"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("vehicle.color").isLength({ min: 3 }).withMessage("color must be at least 3 characters long"),
    body("vehicle.plate").isLength({ min: 3 }).withMessage("plate must be at least 3 characters long"),
    body("vehicle.capacity").isNumeric().withMessage("capacity must be a number"),
    body("vehicle.vehicleType").isIn(["car", "bike", "auto"]).withMessage("vehicleType must be one of car, bike, auto")
],
    captainController.createCaptain
);

module.exports =router