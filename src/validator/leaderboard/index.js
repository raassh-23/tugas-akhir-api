const {LeaderboardPayloadSchema, LeaderboardQuerySchema} = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const LeaderboardValidator = {
  validatePayload: (payload) => {
    const validationResult = LeaderboardPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }

    return validationResult.value;
  },
  validateQuery: (query) => {
    const validationResult = LeaderboardQuerySchema.validate(query);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }

    return validationResult.value;
  },
};

module.exports = LeaderboardValidator;
