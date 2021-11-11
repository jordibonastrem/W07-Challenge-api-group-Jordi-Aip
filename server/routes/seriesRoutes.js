const express = require("express");
const {
  getSeries,
  deleteSerie,
  updateSeriesById,
} = require("../controllers/seriesControllers");

const router = express.Router();

router.get("/", getSeries);
router.put("/:idSerie", updateSeriesById);
router.delete("/:idSerie", deleteSerie);

module.exports = router;
