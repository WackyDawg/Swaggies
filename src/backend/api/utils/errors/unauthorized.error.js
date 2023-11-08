import httpStatus from "http-status";
import AppError  from "./app.error"

class UnAuthorizedError extends AppError {
  constructor(message = httpStatus[httpStatus.UNAUTHORIZED]) {
    super(message);
    this.statusCode = httpStatus.UNAUTHORIZED;
    this.isOperational = true;
  }
}

module.exports = UnAuthorizedError;
