const httpStatus = require("http-status");
const AppError = require("./app.error");

class ConflictError extends AppError {
    constructor(message = httpStatus[httpStatus.CONFLICT]) {
        super(message);
        this.statusCode = httpStatus.CONFLICT;
        this.isOperational = true; 
    }
}

module.exports = ConflictError;
