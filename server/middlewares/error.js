const debug = require("debug")("robots:errors");
const { ValidationError } = require("express-validation");

const notFoundErrorHandler = (req, res) => {
  res.status(404).json({
    error: "Dead end... Go back to where you came from.",
  });
};

// eslint-disable-next-line no-unused-vars
const generalErrorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    error.code = 401;
    error.message =
      "Oh no! You've made a mistake! (If it'd only be the first one you've ever made...)";
  }
  debug(`Warning. Error: ${error.message}`);
  const message = error.code
    ? error.message
    : "Panic! You've broken everything down and nobody loves you!";
  res.status(error.code || 500);
  res.json({ error: message });
};

module.exports = {
  notFoundErrorHandler,
  generalErrorHandler,
};
