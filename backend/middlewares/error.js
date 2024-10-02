const ErrorHandler = require("../utility/error.js");

function ErrorMiddleware(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server error";

  // mongoose Error
  if (err.name === "CastError") {
    const message = `Resource Not found! ${err.path} `;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate key Error
  if (err.code === 11000) {
    const message = "email has already been taken!";
    err = new ErrorHandler(message, 400);
  }

  // jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Invalid json token , please try again `;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Your session has been expired , please login again `;
    err = new ErrorHandler(message, 400);
  }

  return res.status(err.statusCode).json({
    message: err.message,
    success: "Fail",
  });
}

module.exports = ErrorMiddleware;
