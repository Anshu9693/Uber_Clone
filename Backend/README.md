

# User API Documentation

## POST /users/register

### Description
Registers a new user in the system. Validates input, hashes the password, creates a user, and returns an authentication token with user data.

### Request Body
```
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

#### Example
```
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### Responses
#### Success
- **Status Code:** `200 OK`
- **Body:**
```
{
  "token": "<JWT token>",
  "user": {
    "_id": "<user id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other user fields
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
      "msg": "Error message",
      "param": "field name",
      "location": "body"
    }
    // ...more errors
  ]
}
```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**
```
{
  "error": "Error message"
}
```

### Notes
- The `email` must be unique.
- The `password` is securely hashed before storage.
- The returned `token` is a JWT for authentication in subsequent requests.

---

## POST /users/login

### Description
Authenticates a user with email and password. Returns a JWT token and user data if credentials are valid.

### Request Body
```
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

#### Example
```
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### Responses
#### Success
- **Status Code:** `200 OK`
- **Body:**
```
{
  "token": "<JWT token>",
  "user": {
    "_id": "<user id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other user fields
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
      "msg": "Error message",
      "param": "field name",
      "location": "body"
    }
    // ...more errors
  ]
}
```

#### Invalid Credentials
- **Status Code:** `401 Unauthorized`
- **Body:**
```
{
  "message": "Invalid email or password"
}
```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**
```
{
  "error": "Error message"
}
```

### Notes
- The `email` and `password` must match an existing user.
- The returned `token` is a JWT for authentication in subsequent requests.


---

## GET /users/profile

### Description
Returns the authenticated user's profile information. Requires a valid JWT token in the `Authorization` header or as a cookie.

### Headers
- `Authorization: Bearer <token>` (or send token as a cookie named `token`)

### Response
#### Success
- **Status Code:** `200 OK`
- **Body:**
```
{
  "_id": "<user id>",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
  // ...other user fields
}
```

#### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body:**
```
{
  "message": "Access denied, no token provided"
}
```
or
```
{
  "message": "unauthorized"
}
```

---


## GET /users/logout

### Description
Logs out the authenticated user by blacklisting the current JWT token and clearing the authentication cookie. Requires a valid JWT token in the `Authorization` header or as a cookie.

### Headers
- `Authorization: Bearer <token>` (or send token as a cookie named `token`)

### Response
#### Success
- **Status Code:** `200 OK`
- **Body:**
```
{
  "message": "Logged out successfully"
}
```

#### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body:**
```
{
  "message": "Access denied, no token provided"
}
```
or
```
{
  "message": "unauthorized"
}
```





---     










# Captain API Documentation

## POST /captains/register

### Description
Registers a new captain (driver) in the system. Validates input, hashes the password, creates a captain, and returns an authentication token with captain data.

### Request Body
```
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)",
  "vehicle": {
    "color": "string (min 3 chars, required)",
    "plate": "string (min 3 chars, required)",
    "capacity": number (required),
    "vehicleType": "car|bike|auto" (required)
  }
}
```

#### Example
```
{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "securePassword123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Responses
#### Success
- **Status Code:** `200 OK`
- **Body:**
```
{
  "token": "<JWT token>",
  "captain": {
    "_id": "<captain id>",
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "alice.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ1234",
      "capacity": 4,
      "vehicleType": "car"
    }
    // ...other captain fields
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
      "msg": "Error message",
      "param": "field name",
      "location": "body"
    }
    // ...more errors
  ]
}
```

#### Already Exists
- **Status Code:** `400 Bad Request`
- **Body:**
```
{
  "message": "Captain already exists"
}
```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**
```
{
  "error": "Error message"
}
```

### Notes
- The `email` must be unique.
- The `password` is securely hashed before storage.
- The returned `token` is a JWT for authentication in subsequent requests.
- The `vehicleType` must be one of: `car`, `bike`, or `auto`.

---

## POST /captains/login

### Description
Authenticates a captain with email and password. Returns a JWT token and captain data if credentials are valid.

### Request Body
```
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

#### Example
```
{
  "email": "alice.smith@example.com",
  "password": "securePassword123"
}
```

### Responses
#### Success
- **Status Code:** `200 OK`
- **Body:**
```
{
  "token": "<JWT token>",
  "captain": {
    "_id": "<captain id>",
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "alice.smith@example.com",
    // ...other captain fields
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
      "msg": "Error message",
      "param": "field name",
      "location": "body"
    }
    // ...more errors
  ]
}
```

#### Invalid Credentials
- **Status Code:** `401 Unauthorized`
- **Body:**
```
{
  "message": "Invalid email or password"
}
```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**
```
{
  "error": "Error message"
}
```

---

## GET /captains/profile

### Description
Returns the authenticated captain's profile information. Requires a valid JWT token in the `Authorization` header or as a cookie.

### Headers
- `Authorization: Bearer <token>` (or send token as a cookie named `token`)

### Response
#### Success
- **Status Code:** `200 OK`
- **Body:**
```
{
  "_id": "<captain id>",
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice.smith@example.com",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ1234",
    "capacity": 4,
    "vehicleType": "car"
  }
  // ...other captain fields
}
```

#### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body:**
```
{
  "message": "Access denied, no token provided"
}
```
or
```
{
  "message": "unauthorized hello"
}
```

---

## GET /captains/logout

### Description
Logs out the authenticated captain by blacklisting the current JWT token and clearing the authentication cookie. Requires a valid JWT token in the `Authorization` header or as a cookie.

### Headers
- `Authorization: Bearer <token>` (or send token as a cookie named `token`)

### Response
#### Success
- **Status Code:** `200 OK`
- **Body:**
```
{
  "message": "Logged out successfully"
}
```

#### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body:**
```
{
  "message": "Access denied, no token provided"
}
```
or
```
{
  "message": "unauthorized hello"
}
```
