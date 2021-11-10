const Serie = require("../../database/models/series");

const getSeries = async (req, res) => {
  const series = await Serie.find();
  res.json(series);
};

const getSeriesById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const searchedSeries = await Serie.find({ _id: id, user: req.userId });
    if (searchedSeries) {
      res.json(searchedSeries);
    } else {
      const error = new Error("Serie not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

module.exports = { getSeries, getSeriesById };
