const { Joi } = require("express-validation");

const createSeriesSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    isSeen: Joi.boolean().optional(),
    platform: Joi.string().required(),
  }),
};

module.exports = createSeriesSchema;
