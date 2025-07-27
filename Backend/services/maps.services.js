const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
  if (!address) throw new Error('Address is required');
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) throw new Error('Google Maps API key not set');

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    const results = response.data.results; 
    if (results && results.length > 0) {
      const location = results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error('No coordinates found for this address');
    }
  } catch (error) {
    throw new Error('Failed to fetch coordinates: ' + error.message);
  }
}