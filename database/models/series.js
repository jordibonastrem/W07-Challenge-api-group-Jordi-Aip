const { Schema, model } = require("mongoose");

const seriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isSeen: {
    type: Boolean,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
});

const Serie = model("Serie", seriesSchema, "Series");

module.exports = Serie;
