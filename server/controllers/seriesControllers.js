const chalk = require("chalk");
const debug = require("debug")("robots:server");
const Serie = require("../../database/models/series");

const getSeries = async (req, res) => {
  const series = await Serie.find();
  res.json(series);
};

const updateSeriesById = async (req, res, next) => {
  try {
    const series = req.body;
    const { _id } = req.body;

    const updatedSeries = await Serie.findByIdAndUpdate(_id, req.body, {
      runValidators: true,
      new: true,
    });
    if (updatedSeries) {
      res.json(series);
    } else {
      const error = new Error("Yeah... sorry. Serie not found.");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

const createSerie = async (req, res, next) => {
  try {
    debug(chalk.cyanBright("Alright. *Pat pat*."));
    const newSerie = await Serie.create(req.body);
    res.json(newSerie);
  } catch (error) {
    debug(chalk.red("Nope. All wrong."));
    error.message = "Nope. All wrong.";
    error.code = 400;
    next(error);
  }
};

const deleteSerie = async (req, res, next) => {
  const { idSerie } = req.params;
  try {
    const deletedSerie = await Serie.findByIdAndDelete(idSerie);
    if (deletedSerie) {
      res.json({ id: deleteSerie.id });
    } else {
      const error = new Error("Wrong series! SO typical of you...");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "Ooooooooooooh! Caught in a Bad Request!";
    next(error);
  }
};

module.exports = { getSeries, updateSeriesById, deleteSerie, createSerie };
