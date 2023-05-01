const Joi = require('joi');

const LeaderboardPayloadSchema = Joi.object({
  level: Joi.number().integer().min(0).required(),
  username: Joi.string().max(100).required(),
  steps: Joi.number().integer().min(0).required(),
  commands: Joi.number().integer().min(0).required(),
  time_ms: Joi.number().integer().min(0).required(),
});

module.exports = {LeaderboardPayloadSchema};
