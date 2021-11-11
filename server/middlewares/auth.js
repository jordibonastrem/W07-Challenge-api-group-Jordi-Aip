require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("robots:server");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    debug(chalk.red("Nice try. Better go home.There is no auth"));
    const error = new Error("Nice try. Better go home.");
    error.code = 401;
    next(error);
  } else {
    const token = authHeader.split(" ")[1];
    console.log(token);
    if (!token) {
      debug(chalk.red("Nice try. Better go home.There is auth but is"));

      const error = new Error("Nice try. Better go home. Tok");
      error.code = 401;
      next(error);
    } else {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        console.log(user);
        req.userId = user.id;
        next();
      } catch {
        const error = new Error("BOOOH... worst token e-ver!");
        error.code = 401;
        next(error);
      }
    }
  }
};

module.exports = auth;
