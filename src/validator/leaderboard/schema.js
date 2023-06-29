const Joi = require('joi');

const LeaderboardPayloadSchema = Joi.object({
  level: Joi.number().integer().min(0).required(),
  username: Joi.string().max(100).required(),
  steps: Joi.number().integer().min(1).required(),
  codeBlocks: Joi.number().integer().min(1).required(),
  timeMs: Joi.number().integer().min(1).required(),
});

const LeaderboardQuerySchema = Joi.object({
  level: Joi.number().integer().min(0).required(),
  sortBy: Joi.string().valid('steps', 'codeBlocks', 'timeMs')
      .default('timeMs'),
  order: Joi.string().valid('asc', 'desc').default('asc'),
  page: Joi.number().integer().min(1).default(1),
  pageSize: Joi.number().integer().min(1).default(5),
});

module.exports = {
  LeaderboardPayloadSchema,
  LeaderboardQuerySchema,
};
