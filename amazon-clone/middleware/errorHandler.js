const CustomError = require("../errors/CustomError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  console.log(err);
  return res.status(500).json({ err: err });
};

module.exports = errorHandler;
