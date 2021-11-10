const Serie = require("../../database/models/series");

const getSeries = async (req, res) => {
  const series = await Serie.find();
  res.json(series); // test
};

module.exports = { getSeries };
