const express = require("express");
const { validate } = require("express-validation");
const {
  getSeries,
  deleteSerie,
  updateSeriesById,
  createSerie,
} = require("../controllers/seriesControllers");
const createSeriesSchema = require("../schemas/seriesSchema");

const router = express.Router();

router.get("/", getSeries);
router.put("/:idSerie", updateSeriesById);
router.delete("/:idSerie", deleteSerie);
router.post("/", validate(createSeriesSchema), createSerie);

module.exports = router;
