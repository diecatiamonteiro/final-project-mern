import createError from "http-errors";

/**
 * @desc  For routes not found
 */

export const routeNotFound = () => {
  return next(createError(404, "Page was not found"));
};

/**
 * @desc  Global error handler
 */

export const globalErrorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    statusCode: err.status || 500,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Include stack trace only in development
  });
};
