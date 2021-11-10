const express = require("express");
const {
  getSeries,
  deleteSerie,
  getSeriesById,
} = require("../controllers/seriesControllers");

const router = express.Router();

router.get("/", getSeries);
router.get("/:idSerie", getSeriesById);
router.delete("/:idSerie", deleteSerie);

module.exports = router;
