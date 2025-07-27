# Maps API Documentation

## GET /maps/maps-coordinates

### Description
Returns the latitude and longitude coordinates for a given address using the Google Maps Geocoding API.

### Query Parameters
- `address` (string, required): The address to geocode (min 3 characters).

### Headers
- Requires authentication (JWT token in `Authorization` header or as a cookie).

### Response
#### Success
- **Status Code:** `200 OK`
- **Body:**
```
{
  "lat": 28.6139,
  "lng": 77.2090
}
```
#### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
```
{
  "errors": [ ... ]
}
```
#### Not Found
- **Status Code:** `404 Not Found`
- **Body:**
```
{
  "message": "coordinates not found"
}
```

---

## GET /maps/get-distance-time

### Description
Returns the distance and estimated travel time between two locations using the Google Maps Distance Matrix API.

### Query Parameters
- `origin` (string, required): The starting address/location (min 3 characters).
- `destination` (string, required): The destination address/location (min 3 characters).

### Headers
- Requires authentication (JWT token in `Authorization` header or as a cookie).

### Response
#### Success
- **Status Code:** `200 OK`
- **Body:**
```
{
  "distance": { "text": "5.2 km", "value": 5200 },
  "duration": { "text": "15 mins", "value": 900 },
  "status": "OK"
}
```
#### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
```
{
  "errors": [ ... ]
}
```
#### Internal Error
- **Status Code:** `500 Internal Server Error`
- **Body:**
```
{
  "message": "Internal server error"
}
```

---

## GET /maps/get-suggestion

### Description
Returns address autocomplete suggestions for a given input using the Google Maps Places Autocomplete API.

### Query Parameters
- `input` (string, required): The partial address or place name (min 3 characters).

### Headers
- Requires authentication (JWT token in `Authorization` header or as a cookie).

### Response
#### Success
- **Status Code:** `200 OK`
- **Body:**
```
[
  {
    "description": "Connaught Place, New Delhi, India",
    "place_id": "ChIJL_P_CXMEDTkRw0ZdG-0GVvw"
  },
  // ...more suggestions
]
```
#### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
```
{
  "errors": [ ... ]
}
```
#### Internal Error
- **Status Code:** `500 Internal Server Error`
- **Body:**
```
{
  "message": "Internal server error"
}
```

---

### Notes
- All endpoints require a valid Google Maps API key set in your environment variables.
- All endpoints require authentication.
- Error responses follow a consistent format for validation and server errors.
