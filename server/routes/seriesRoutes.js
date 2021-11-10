const express = require("express");
const { getSeries } = require("../controllers/seriesControllers");

const router = express.Router();

router.get("/", getSeries);
router.get("/:idSerie", getSeriesById);

module.exports = router;
