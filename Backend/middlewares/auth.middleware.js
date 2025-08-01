const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListTikenModel = require("../models/blackListToken.model.js");
const captainModel = require("../models/captain.model.js");


module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }
  const isBlackListed = await blackListTikenModel.findOne({ token: token });
  if (isBlackListed) {
    return res
      .status(401)
      .json({ message: "Unauthorize ||Token is blacklisted " });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (error) {
    res.status(401).json({ message: "unauthorized" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }
  const isBlackListed = await blackListTikenModel.findOne({ token: token });
  if (isBlackListed) {
    return res
      .status(401)
      .json({ message: "Unauthorize ||Token is blacklisted " });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;
    return next();
  } catch (error) {
    res.status(401).json({ message: "unauthorized hello" });
  }
};
 