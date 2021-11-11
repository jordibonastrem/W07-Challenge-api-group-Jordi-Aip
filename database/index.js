require("dotenv").config();
const debug = require("debug")("series:database");

const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = () =>
  new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGODB_SERVER, (error) => {
      if (error) {
        debug(chalk.red("No way- we won't do that."));
        reject();
        return;
      }
      debug(
        chalk.green(
          "You're getting in! Congrats on crossing a door, you moron."
        )
      );

      resolve();
    });
  });

module.exports = connectDB;
