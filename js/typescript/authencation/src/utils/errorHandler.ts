export class ErrorHandler extends Error {
  public status: string;
  constructor(
    public message: string,
    public statusCode: number,
    public isOperational: Boolean
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? "fail" : "error";
    this.isOperational = isOperational;

    // Maintain proper prototype chain
    Object.setPrototypeOf(this, ErrorHandler.prototype);

    // Capture stack trace (excluding constructor call)
    Error.captureStackTrace(this, this.constructor);
  }
}
