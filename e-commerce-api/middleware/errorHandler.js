const CustomError = require("../errors/CustomError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ err });
};

module.exports = errorHandler;
