const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  seenSeries: {
    type: Array,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

const User = model("User", userSchema, "Users");

module.exports = User;
