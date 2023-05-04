const Joi = require('joi');

const LeaderboardPayloadSchema = Joi.object({
  level: Joi.number().integer().min(0).required(),
  username: Joi.string().max(100).required(),
  actions: Joi.number().integer().min(0).required(),
  codeBlocks: Joi.number().integer().min(0).required(),
  timeMs: Joi.number().integer().min(0).required(),
});

const LeaderboardQuerySchema = Joi.object({
  level: Joi.number().integer().min(0).required(),
  sortBy: Joi.string().valid('actions', 'codeBlocks', 'timeMs')
      .default('actions'),
  order: Joi.string().valid('asc', 'desc').default('desc'),
  page: Joi.number().integer().min(1).default(1),
  pageSize: Joi.number().integer().min(1).default(10),
});

module.exports = {
  LeaderboardPayloadSchema,
  LeaderboardQuerySchema,
};
