const Serie = require("../../database/models/series");

const getSeries = async (req, res) => {
  const series = await Serie.find();
  res.json(series);
};

const getSeriesById = async (req, res, next) => {
  const { idSerie } = req.params;
  try {
    const searchedSeries = await Serie.findById(idSerie);
    if (searchedSeries) {
      res.json(searchedSeries);
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

module.exports = { getSeries, getSeriesById, deleteSerie };
