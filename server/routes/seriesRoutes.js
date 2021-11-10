const express = require("express");

const router = express.Router();

router.get("/", getSeries);
router.get("/:idRobot", getSeriesById);

module.exports = router;
