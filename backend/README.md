# User Authentication API Documentation

This document provides an overview of the user authentication APIs implemented in the backend. It explains the purpose of each API, the use of `accessToken` and `refreshToken`, and the validation logic used to ensure secure and reliable operations.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Authentication Flow](#authentication-flow)
3. [API Endpoints](#api-endpoints)
   - [Register User](#register-user)
   - [Login User](#login-user)
   - [Refresh Token](#refresh-token)
   - [Logout User](#logout-user)
4. [Validation Middleware](#validation-middleware)
5. [Tokens: AccessToken and RefreshToken](#tokens-accesstoken-and-refreshtoken)
6. [Error Handling](#error-handling)
7. [CheckAuth Middleware](#checkauth-middleware)

---

## Introduction

This backend provides a secure user authentication system using **JWT (JSON Web Tokens)**. It includes:

- User registration
- User login
- Token-based authentication with `accessToken` and `refreshToken`
- Token refresh mechanism
- Logout functionality

---

## Authentication Flow

1. **Register**: A new user registers with their details (firstname, lastname, email, password). The password is hashed before saving to the database.
2. **Login**: The user logs in with their email and password. If valid, an `accessToken` and `refreshToken` are generated and sent as HTTP-only cookies.
3. **Access Token**: Used to authenticate requests to protected resources. It has a short lifespan (e.g., 15 minutes).
4. **Refresh Token**: Used to generate a new `accessToken` when it expires. It has a longer lifespan (e.g., 7 days).
5. **Logout**: Clears the tokens from the client.

---

## API Endpoints

### 1. **Register User**

**Endpoint**: `POST /api/users/register`

**Description**: Registers a new user by saving their details in the database. The password is hashed before saving.

**Request Body**:

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response**:

- **Success** (`201 Created`):

  ```json
  {
    "success": true,
    "user": {
      "id": "userId",
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com",
      "avatar": "JD"
    }
  }
  ```

  Cookies:

  - `refresh_token`: HTTP-only, valid for 7 days
  - `access_token`: HTTP-only, valid for 15 minutes

- **Error** (`400 Bad Request`):
  ```json
  {
    "success": false,
    "message": "All fields are required."
  }
  ```

---

### 2. **Login User**

**Endpoint**: `POST /api/users/login`

**Description**: Authenticates a user by verifying their email and password. Generates and sends `accessToken` and `refreshToken`.

**Request Body**:

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response**:

- **Success** (`200 OK`):

  ```json
  {
    "success": true,
    "user": {
      "id": "userId",
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com",
      "avatar": "JD"
    }
  }
  ```

  Cookies:

  - `refresh_token`: HTTP-only, valid for 7 days
  - `access_token`: HTTP-only, valid for 15 minutes

- **Error** (`401 Unauthorized`):
  ```json
  {
    "success": false,
    "message": "Invalid credentials."
  }
  ```

---

### 3. **Refresh Token**

**Endpoint**: `POST /api/users/refresh_token`

**Description**: Generates a new `accessToken` and `refreshToken` using the existing `refreshToken`.

**Request**:

- **Headers**:
  ```http
  Authorization: Bearer <refresh_token>
  ```
- **Cookies**:
  ```http
  refresh_token=<refresh_token>
  ```

**Response**:

- **Success** (`200 OK`):

  ```json
  {
    "success": true
  }
  ```

  Cookies:

  - `refresh_token`: HTTP-only, valid for 7 days
  - `access_token`: HTTP-only, valid for 15 minutes

- **Error** (`400 Bad Request`):
  ```json
  {
    "success": false,
    "message": "Invalid token or user not found."
  }
  ```

---

### 4. **Logout User**

**Endpoint**: `POST /api/users/logout`

**Description**: Logs out the user by clearing the `accessToken` and `refreshToken` cookies.

**Response**:

- **Success** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Logged out successfully."
  }
  ```

---

## Validation Middleware

The `validateRequest` middleware ensures that all required fields are present and valid in the request body. It uses `express-validator` for validation.

**Example Validation**:

- `firstname`: Must not be empty.
- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

**Error Response**:

```json
{
  "success": false,
  "errors": [
    {
      "msg": "Firstname is required.",
      "param": "firstname",
      "location": "body"
    },
    { "msg": "Invalid email address.", "param": "email", "location": "body" }
  ]
}
```

---

## Tokens: AccessToken and RefreshToken

### **AccessToken**:

- **Purpose**: Used to authenticate requests to protected resources.
- **Lifespan**: Short (e.g., 15 minutes).
- **Storage**: Sent as an HTTP-only cookie.

### **RefreshToken**:

- **Purpose**: Used to generate a new `accessToken` when it expires.
- **Lifespan**: Longer (e.g., 7 days).
- **Storage**: Sent as an HTTP-only cookie and stored in the database.

**Why Use Both?**

- **AccessToken**: Short lifespan reduces the risk of misuse if intercepted.
- **RefreshToken**: Allows seamless re-authentication without requiring the user to log in again.

---

## Error Handling

The `ApiError` class is used to handle custom errors with specific status codes and messages. If an error occurs, it is logged to the console, and a meaningful response is sent to the client.

**Example Error Response**:

```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## CheckAuth Middleware

**Description**: The `checkAuth` middleware is used to protect routes by ensuring that only authenticated users can access them. It verifies the `accessToken` provided in the request and attaches the authenticated user's data to the `req` object.

**How It Works**:

1. Extracts the `accessToken` from either the `Authorization` header or cookies.
2. Verifies the token using the `ACCESS_TOKEN_SECRET`.
3. Fetches the user associated with the token from the database.
4. Attaches the user data (excluding sensitive fields like `password` and `refreshToken`) to the `req` object.
5. Calls the `next()` function to proceed to the next middleware or route handler.

**Error Handling**:

- If the token is missing, invalid, or expired, an appropriate error response is sent.
- Logs errors to the console for debugging purposes.

**Example Usage**:

```javascript
import { checkAuth } from "../middlewares/auth.middleware.js";

router.get("/profile", checkAuth, getUser);
```

**Error Response**:

- **Missing Token** (`400 Bad Request`):

  ```json
  {
    "success": false,
    "message": "Token is missing."
  }
  ```

- **Invalid Token** (`400 Bad Request`):

  ```json
  {
    "success": false,
    "message": "Not a valid token."
  }
  ```

- **Unauthorized** (`401 Unauthorized`):
  ```json
  {
    "success": false,
    "message": "Unauthorized or invalid token."
  }
  ```

---

## Conclusion

This documentation provides a detailed overview of the user authentication APIs. The system is designed to be secure, scalable, and user-friendly, leveraging best practices like token-based authentication, validation, and error handling.
