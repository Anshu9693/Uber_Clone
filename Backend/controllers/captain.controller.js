const captainModel = require("../models/captain.model.js");
const captainService = require("../services/captain.service.js");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blackListToken.model.js");

module.exports.createCaptain = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty){
        return res.status(400).json({ errors: error.array() });
    }
    const {fullname, email, password, vehicle} = req.body;
    const hashPassword = await captainModel.hashPassword(password);
    const isCaptainExist = await captainModel.findOne({ email });
    if(isCaptainExist){
        return res.status(400).json({ message: "Captain already exists" });
    }
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });
    const token = captain.generateAuthToken();
    res.status(200).json({ token, captain });
}

module.exports.loginCaptain = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = captain.generateAuthToken();
    res.cookie("token", token)
    res.status(200).json({ token, captain }); 
}


module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain);
}


module.exports.logoutCaptain = async (req, res, next) => {
    
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await blackListTokenModel.create({ token });
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
}