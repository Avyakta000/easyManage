const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };

const errorHandler = (err, req, res, next) => {

    // set the status code based on the error or default to 500
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    const errMsg = err.message || "Internal Server Error";
    console.log(err,'error')
    res.status(statusCode).json({
      status: statusCode,
      error: errMsg,
      stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
  };
  
  module.exports = { notFound, errorHandler };
  