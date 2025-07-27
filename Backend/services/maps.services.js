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


module.exports.getDistanceAndTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("Origin and destination are required");
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) throw new Error('Google Maps API key not set');

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            const element = response.data.rows[0].elements[0];
            if (element.status === 'ZERO_RESULTS') {
                throw new Error('No route found between the specified locations');
            }
            return element;
        } else {
            throw new Error('Failed to fetch distance and time');
        }

    } catch (error) {
        throw new Error('Failed to fetch distance and time: ' + error.message);
    }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) throw new Error('Address is required');
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) throw new Error('Google Maps API key not set');

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if(response.data.status==='OK'){
        return response.data.predictions;  // ✅

    }
    else {
        throw new Error('No suggestions found for this input');
    }
  } catch (error) {
    throw new Error('Failed to fetch autocomplete suggestions: ' + error.message);
  }
}