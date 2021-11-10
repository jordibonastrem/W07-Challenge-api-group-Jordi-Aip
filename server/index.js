const chalk = require("chalk");
const debug = require("debug")("robots:server");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const seriesRoutes = require("./routes/seriesRoutes");
const { notFoundErrorHandler, generalErrorHandler } = require("./error");
const userRoutes = require("./routes/userRoutes");

const app = express();

let server;
const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      debug(
        chalk.blue(
          `Hey there! Server ${port}'s feeling heard, thanks to your efforts.`
        )
      );
      resolve(server);
    });

    server.on("error", (error) => {
      debug(chalk.red("Oh no! The server's feeling ignored :(."));
      if (error.code === "EADDRINUSE") {
        debug(
          chalk.blue(`Oops! Port ${port} is busy (talk to your hand instead).`)
        );
      }
      reject(error);
    });
  });

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/series", seriesRoutes);
app.use("/users", userRoutes);
/* app.use("/platform", platformsRoutes); */

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

module.exports = { initializeServer, app };
