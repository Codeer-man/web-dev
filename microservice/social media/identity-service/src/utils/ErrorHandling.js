class ErrorHandling extends Error {
  constructor(message, statusCode, success) {
    super(message);
    (this.statusCode = statusCode || 500), (this.success = success);

    Object.getPrototypeOf(this, ErrorHandling.prototype);

    Error.captureStackTrace(this.this.constructor);
  }
}

module.exports = ErrorHandling;
