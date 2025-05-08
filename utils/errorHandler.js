const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    // Custom error messages
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Server Error';
  
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
      message = 'Resource not found';
      statusCode = 404;
    }
  
    // Mongoose duplicate key
    if (err.code === 11000) {
      message = 'Duplicate field value entered';
      statusCode = 400;
    }
  
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      message = Object.values(err.errors).map(val => val.message);
      statusCode = 400;
    }
  
    // JWT errors
    if (err.name === 'JsonWebTokenError') {
      message = 'Invalid token';
      statusCode = 401;
    }
  
    if (err.name === 'TokenExpiredError') {
      message = 'Token expired';
      statusCode = 401;
    }
  
    res.status(statusCode).json({
      success: false,
      error: message
    });
  };
  
  module.exports = errorHandler;
  