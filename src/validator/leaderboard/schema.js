const Joi = require('joi');

const LeaderboardPayloadSchema = Joi.object({
  level: Joi.number().integer().min(0).required(),
  username: Joi.string().max(100).required(),
  steps: Joi.number().integer().min(0).required(),
  commands: Joi.number().integer().min(0).required(),
  time_ms: Joi.number().integer().min(0).required(),
});

const LeaderboardQuerySchema = Joi.object({
  level: Joi.number().integer().min(0).required(),
  sortBy: Joi.string().valid('steps', 'commands', 'timeMs').default('steps'),
  order: Joi.string().valid('asc', 'desc').default('desc'),
});

module.exports = {
  LeaderboardPayloadSchema,
  LeaderboardQuerySchema,
};
