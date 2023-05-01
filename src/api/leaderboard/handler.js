class LeaderboardHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postLeaderboardHandler = this.postLeaderboardHandler.bind(this);
    this.getLeaderboardHandler = this.getLeaderboardHandler.bind(this);
  }

  async postLeaderboardHandler({payload}, h) {
    const {
      level,
      username,
      steps,
      commands,
      time_ms: timeMs,
    } = this._validator.validatePayload(payload);

    const itemId = await this._service.addItem({
      level, username, steps, commands, timeMs,
    });

    return h.response({
      error: false,
      message: 'Item added to leaderboard',
      data: {
        id: itemId,
      },
    }).code(201);
  }

  async getLeaderboardHandler({query}) {
    const {
      level,
      sortBy,
      order,
    } = this._validator.validateQuery(query);

    const items = await this._service.getItemsByLevel(level, sortBy, order);

    return {
      error: false,
      message: 'Leaderboard retrieved',
      data: {
        count: items.length,
        items,
      },
    };
  }
}

module.exports = LeaderboardHandler;
