const rideModel = require("../models/ride.model")
const mapsService = require("./maps.services")
const crypto = require('crypto');

async function getFare (pickup,distance){
if(!pickup || !distance) {
    throw new Error("Pickup location and distance are required to calculate fare");
  }
    const distanceTime = await mapsService.getDistanceAndTime(pickup, distance);
    // Defensive check for Google Maps API response
    if (!distanceTime.distance || typeof distanceTime.distance.value !== 'number' || !distanceTime.duration || typeof distanceTime.duration.value !== 'number') {
        throw new Error('Distance or duration not found in Google Maps response');
    }
    const baseFare = {
        auto: 30,
        bike:20,
        car: 50,
    };
    const perKmRate = {
        auto: 10,
        bike: 5,
        car: 15,
    };
    const perMinuteRate = {
        bike: 1,
        car: 3,
        auto:2
    };
    const fare = {
        auto:
             (baseFare.auto +
            (distanceTime.distance.value / 1000) * perKmRate.auto +
            (distanceTime.duration.value / 60) * perMinuteRate.auto).toFixed(2),
        bike:
          (  baseFare.bike +
            (distanceTime.distance.value / 1000) * perKmRate.bike +
            (distanceTime.duration.value / 60) * perMinuteRate.bike).toFixed(2),
        car:
          ( baseFare.car +
            (distanceTime.distance.value / 1000) * perKmRate.car +
            (distanceTime.duration.value / 60) * perMinuteRate.car).toFixed(2)
    };
    console.log(fare);
    return fare
   
}

module.exports.getFare = getFare;

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}
module.exports.createRide = async (user,pickup,destination,vehicleType)=> {
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error("User, pickup, destination and vehicle type are required to create a ride");
    }
    let fare;
    try {
        fare = await getFare(pickup, destination);
    } catch (err) {
        throw new Error(err.message || 'Failed to calculate fare');
    }
    if (!fare || typeof fare[vehicleType] !== 'number') {
        throw new Error('Fare calculation failed for vehicle type: ' + vehicleType);
    }
    const ride = new rideModel({
        user: user._id,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType],
    });
    await ride.save();
    return ride;
}


