const AppError = require('./../utils/AppError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsErrorDB = (err) => {
  const message = `Duplicate field value: ${err.keyValue.name}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const error = Object.values(err.errors).map((item) => item.message);
  // console.log(error);
  const message = `Invalid input data. ${error.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) => new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = (err) => new AppError('Your token is expired!', 401);
const sendErrorDev = (error, req, res) => {
  //API
  if (req.originalUrl.startsWith('/api')) {
    res.status(error.statusCode).json({
      status: error.status,
      error: error,
      message: error.message,
      stack: error.stack,
    });
    // RENDERED WEBSITE
  } else {
    res.status(error.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: error.message,
    });
  }
};

const sendErrorProd = (error, req, res) => {
  console.log(error.message);
  if (req.originalUrl.startsWith('/api')) {
    if (error.isOperational) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    } else {
      return res.status(500).json({
        status: `Error`,
        message: `Something went very wrong`,
      });
    }
  } else {
    // Rendered website
    if (error.isOperational) {
      return res.status(error.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: error.message,
      });
    } else {
      return res.status(error.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: 'Please try again later',
      });
    }
  }
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || `error`;

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let err = { ...error };
    err.message = error.message;
    // console.log(error.name);
    if (error.name === 'CastError') err = handleCastErrorDB(err);
    if (error.code === 11000) err = handleDuplicateFieldsErrorDB(err);
    if (error.name === 'ValidationError') err = handleValidationErrorDB(err);
    if (error.name === 'JsonWebTokenError') err = handleJWTError(err);
    if (error.name === 'TokenExpiredError') err = handleJWTExpiredError(err);

    sendErrorProd(err, req, res);
  }
};
