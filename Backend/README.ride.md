# Ride API Documentation

## POST /rides/create

### Description
Creates a new ride for an authenticated user. Calculates fare using Google Maps API, generates an OTP, and saves the ride.

### Request Body
```
{
  "pickup": "Connaught Place, New Delhi",
  "destination": "Indira Gandhi International Airport, New Delhi",
  "vehicleType": "car"
}
```

#### Example
```
{
  "pickup": "Connaught Place, New Delhi",
  "destination": "Indira Gandhi International Airport, New Delhi",
  "vehicleType": "car"
}
```

### Headers
- Requires authentication (JWT token in `Authorization` header or as a cookie).

### Response
#### Success
- **Status Code:** `201 Created`
- **Body:**
```
{
  "ride": {
    "_id": "64b7c2e2f1a2b3c4d5e6f7a8",
    "user": "64b7c2e2f1a2b3c4d5e6f7a1",
    "pickup": "Connaught Place, New Delhi",
    "destination": "Indira Gandhi International Airport, New Delhi",
    "fare": 350,
    "status": "pending",
    // ...other ride fields
  }
}
```

#### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
```
{
  "errors": [
    {
      "msg": "Pickup location is required",
      "param": "pickup",
      "location": "body"
    },
    {
      "msg": "Vehicle type is required and must be one of 'car', 'bike', or 'auto'",
      "param": "vehicleType",
      "location": "body"
    }
  ]
}
```

#### Fare Calculation Error
- **Status Code:** `500 Internal Server Error`
- **Body:**
```
{
  "error": "Fare calculation failed for vehicle type: auto"
}
```

---

## Ride Model Fields
- `user`: User ID (ObjectId, required)
- `captain`: Captain ID (ObjectId, optional)
- `pickup`: Pickup location (string, required)
- `destination`: Destination location (string, required)
- `fare`: Calculated fare (number, required)
- `status`: Ride status (string, default: "pending")
- `durating`: Duration in seconds (number, optional)
- `distance`: Distance in meters (number, optional)
- `otp`: One-time password for ride verification (string, required, not returned by default)
- `paymentId`, `orderId`, `signature`: Payment-related fields (optional)

---

### Notes
- All endpoints require authentication.
- Fare is calculated using Google Maps Distance Matrix API.
- OTP is generated for each ride and not returned in API response by default (select: false).
- Error responses follow a consistent format for validation and server errors.
