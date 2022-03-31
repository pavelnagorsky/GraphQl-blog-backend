// async errorHandler for express
module.exports = (error, next) => {
  if (!error.statusCode) {
    error.statusCode = 500;
  }
  next(error);
}