const { model } = require("mongoose");
const rideModel = require("../models/ride.model");
const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapsService = require("../services/maps.services");
const {sendMessageToSocketId} = require('../socket')

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {userId, pickup, destination, vehicleType } = req.body;
  try {
    const ride = await rideService.createRide(
      req.user._id, // Assuming req.user is populated by authMiddleware
      pickup,
      destination,
      vehicleType
    );
     res.status(201).json({ ride });

     const pickupCoordinates = await mapsService.getAddressCoordinate(pickup);
     console.log(pickupCoordinates)
    const captainsInRaduius = await mapsService.getCaptainInTheRadius(pickupCoordinates.ltd,pickupCoordinates.lng,2000)// Assuming 5 km radius

    ride.otp=""

    const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate("user");
    captainsInRaduius.map(async (captain) => {
      console.log(captain,ride)
    sendMessageToSocketId(captain.socketId,{
      event:"new-ride",
      data:rideWithUser
    })
    })

    console.log(captainsInRaduius);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;
  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json({ fare });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}


module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } s
}