class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong") {
    super(message);
    this.statusCode = statusCode;
    this.success = false;

    Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
