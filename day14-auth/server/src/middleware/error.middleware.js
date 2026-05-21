const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.log("error: ", err);

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorMiddleware;
